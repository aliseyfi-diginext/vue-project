<template>
    <div class="container">

        <div class="text-end">
            <button type="button" class="btn btn-primary" @click="openModal()">
                <i class="bi bi-plus"></i>
                Create new task
            </button>
        </div>

        <hr>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>  </th>
                    <th> Title </th>
                    <th> Owner </th>
                    <th> Done </th>
                    <th> Date </th>
                    <th colspan="2"> Actions </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task, i in tasks" :class="task.done ? 'done' : ''">
                    <td class="check-uncheck" @click="changeStatus(task)">
                        <i v-if="task.done" class="bi bi-check-square"></i>
                        <i v-else class="bi bi-square"></i>
                    </td>
                    <td> {{task.title}} </td>
                    <td>
                        <span v-if="task.owner">{{task.owner}}</span>
                        <em>no owner</em>
                    </td>
                    <td>
                        <i v-if="task.done" class="bi bi-check text-success"></i>
                        <i v-else class="bi bi-x text-danger"></i>
                    </td>
                    <td> {{task.created_at}} </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-success" @click="openModal(i)">
                            <i class="bi bi-pen"></i>
                            Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteTask(i)">
                            <i class="bi bi-trash"></i>
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>



        <!-- Modal -->
        <div class="modal fade" ref="modal" id="task-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Create Task </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row align-items-center justify-content-center" @submit.prevent="saveTask">
                            <div class="col-md-6 my-2">
                                <label class="mb-2"> Title </label>
                                <input type="text" class="form-control" v-model="currentTask.title">
                            </div>
                            <div class="col-md-4 my-2">
                                <label class="mb-2"> Owner </label>
                                <input type="text" class="form-control" v-model="currentTask.owner">
                            </div>
                            <div class="col-md-2 my-2">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="done">
                                    <label class="custom-control-label ms-1" for="done">Done</label>
                                </div>
                            </div>
                            <div class="col-md-12 my-2">
                                <label class="mb-2"> Description </label>
                                <textarea rows="4" v-model="currentTask.description" class="form-control"></textarea>
                            </div>
                            <div class="col-md-4 my-2 text-center">
                                <div v-if="saving" class="d-flex align-items-center">
                                    <span class="spinner-border"></span>
                                    <span class="ms-2">please wait...</span>
                                </div>
                                <button v-else type="submit" class="btn btn-primary">
                                    <span v-if="currentTask.id">Update</span>
                                    <span v-else>Save</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../jsons/config.json';

export default {
    mounted : function () {

        this.modal = new bootstrap.Modal(document.getElementById('task-modal'), {});

        var url = `${config.address}/task`;
        var headers = {Authorization:`Bearer:${config.token}`};
        axios({
            method : 'get',
            url : url,
            headers : headers,
        }).then( res => {
            if (res.status == 200) {
                this.tasks = res.data;
            }
        });
    },
    data : function () {
        return {
            tasks : [],
            currentTask : {},
            config : config,
            saving : false,
            modal : null
        }
    },
    methods : {
        openModal : function (index=-1) {
            if (index < 0) {
                this.currentTask = {};
            }else {
                var task = this.tasks[index];
                this.currentTask = task;
            }
            this.modal.show();
        },
        changeStatus : function (task) {
            var newStatus = !task.done;

            var url = `${config.address}/task/status/${task.id}`;
            var headers = {Authorization:`Bearer:${config.token}`};
            var data = {done:newStatus};

            task.done = newStatus;

            axios({
                method : 'put',
                url : url,
                headers : headers,
                data : data,
            });
        },
        saveTask : function () {
            var task = this.currentTask;
            console.log(task);
            this.saving = true;
            var url = task.id ? `${config.address}/task/${task.id}` :`${config.address}/task`;
            var headers = {Authorization:`Bearer:${config.token}`};
            var data = task;
            var method = task.id ? 'put' : 'post';
            axios({
                method : method,
                url : url,
                data : data,
                headers : headers,
            }).then( res => {
                if (res.status == 201 || res.status == 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Changes made successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.tasks.unshift(res.data);
                    this.modal.hide();
                }
                this.saving = false;
            }).catch( err => {
                var errors = err.response.data.errors;
                var message = err.response.data.message;
                var text = '';
                for (var key in errors) {
                    var arrayOfErrors = errors[key];
                    var stringOfErrors = arrayOfErrors.join(' & ');
                    text += `<p>${stringOfErrors}</p>`;
                }
                Swal.fire({
                    icon: 'error',
                    title: message,
                    html: text,
                });
                this.saving = false;
            });
        },
        deleteTask : function (index) {
            var task = this.tasks[index];
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = `${config.address}/task/${task.id}`;
                    var headers = {Authorization:`Bearer:${config.token}`};
                    axios({
                        method : 'delete',
                        url : url,
                        headers : headers,
                    }).then( res => {
                        if (res.status == 204) {
                            this.tasks.splice(index, 1);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Task deleted',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
                }
            });
        }
    }
}
</script>

<style src="sweetalert2/dist/sweetalert2.min.css"></style>


<style>
    .check-uncheck {
        cursor: pointer;
    }

    .done td {
        color: gray;
        text-decoration: line-through;
    }
</style>
