

<template>
	
	<v-app>
		<v-app-bar color="blue" elevation="18" title="frameworks">
			<template v-slot:prepend="">
				<v-app-bar-nav-icon></v-app-bar-nav-icon>
			</template>
			<v-spacer></v-spacer>
			
			<v-btn class="ma-2" @click="reveal = true ">
			<v-icon
				  icon="mdi-plus-circle"
			></v-icon>
				Add
			</v-btn>
		</v-app-bar>
		<v-main>
			<div class="d-flex justify-center ma-4">
				<v-card
					elevation="18"
					width="250"
					prepend-icon="mdi-plus-circle"
					title= "Add task"
					v-if="reveal"
			>
					
					
					
					<v-card-text>
						<v-container>
							<div>
								<label>Title</label>
								<input type="text" id="title" v-model="title" placeholder="Enter here.." class="titleTextbox" />
							</div>
							<p id="noti4" style="color:white;">Task repeated!</p>
							<p id="noti1" style="color:white;">Title is required !</p>

							<label>Description</label>
							<input type="text" id="descr" v-model="description" placeholder="Enter here.." class="w-100 form-control"/>
							<p id="noti2" style="color:white;">Description is required !</p>
							<label>Deadline</label>
							<input type="date" v-model="date">
							<label>Priority</label>
							<input type="radio" name="Pri" v-model="radio" value="Low">
							<label for="html">Low</label>
							<input type="radio" name="Pri" v-model="radio" value="Med">
							<label for="css">Med</label>
							<input type="radio" name="Pri" v-model="radio" value="High">
							<label for="javascript">High</label>
							<v-btn class="ma-2" color="#008CBA" size="small" @click="SubmitTask()">
							<v-icon icon="mdi-plus-circle"></v-icon>
								Add
							</v-btn>
							<v-btn class="ma-2" color="#f44336" size="small" @click="reveal = false">
							<v-icon icon="mdi-close-circle"></v-icon>
								Cancel
							</v-btn>
							</v-container>
					</v-card-text>


				</v-card>
			</div>
			<div class="d-flex justify-center ma-4">
				<v-card
					elevation="18"
					width="250"					
					prepend-icon="mdi-pen"
					title="Edit task"
					
					v-if="reveal2"
				>
					<v-card-text>
						<v-container>
							<div>
								<label>Description</label>
								<input type="text" id="descr2" v-model="Edescription" class="w-100 form-control">
								<p id="noti3" style="color:white;">Description is required !</p>
							</div>
							<div>
								<label>Deadline</label>
								<input type="date" v-model="Edate">
							</div>
								<label>Priority</label>
							<div>
								<input type="radio" name="Pri" v-model="Eradio" value="Low">
								<label for="html">Low</label>
								<input type="radio" name="Pri" v-model="Eradio" value="Med">
								<label for="css">Med</label>
								<input type="radio" name="Pri" v-model="Eradio" value="High">
								<label for="javascript">High</label>
							</div>
							<v-btn class="ma-2" color="#008CBA" size="small" @click="updateTask()">
							<v-icon icon="mdi-plus-circle"></v-icon>
								Edit
							</v-btn>
							<v-btn class="ma-2" color="#f44336" size="small" @click="reveal2 = false">
							<v-icon icon="mdi-close-circle"></v-icon>
								Cancel
							</v-btn>
							</v-container>
					</v-card-text>


				</v-card>
			</div>
			<v-table>
				<thead>
					<tr>
						<th class="text-left">
							Title
						</th>
						<th class="text-left">
							Description
						</th>
						<th class="text-left">
							Deadline
						</th>
						<th class="text-left">
							Priority
						</th>
						<th class="text-left">
							Is Complete
						</th>
						<th class="text-left">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
					  v-for="(item, index) in tasks"
					  :key="index"
      >
						<td>{{ item.title }}</td>
						<td>{{ item.description }}</td>
						<td>{{ item.deadline }}</td>
						<td>{{ item.priority }}</td>
						<td>
							<form>
								<input type="checkbox" id="complete1"  value="Complete" @click="disableBtn(index)">
							</form>
						</td>
						<td>
							<v-btn class="ma-2" color="#008CBA" size="small" @click="editTask(index)">
								<v-icon icon="mdi-pen"></v-icon>
								Update
							</v-btn>
							<v-btn class="ma-2" color="#f44336" size="small" @click="deleteTask(index)">
								<v-icon icon="mdi-delete"></v-icon>
								Delete
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
			
			<v-snackbar v-model="snackbar" location="bottom right" multi-line>
				<p style="color:green;">Success</p>

				<template v-slot:actions="">
					<v-btn
					  color="red"
					  variant="text"
					  @click="snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
			
			<v-snackbar v-model="snackbar2" location="bottom right" multi-line>
				<p style="color:red;">Error</p>

				<template v-slot:actions="">
					<v-btn
					  color="red"
					  variant="text"
					  @click="snackbar2 = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</v-main>
		
	</v-app>

</template>

<script>

	export default {


	data() {
	return{
	snackbar: false,
	snackbar2: false,
	task: "",
	editedTask: null,
	reveal: false,
	reveal2: false,
	tasks: [
	{
	title: 'task1',
	description: 'wow',
	deadline: '2022-02-22',
	priority: 'Low',
	},

	],
	}
	},

	methods: {
	// delete task
	deleteTask(index) {
	this.tasks.splice(index, 1),
	this.snackbar = true
	},
	// edit task
	editTask(index) {
	this.reveal2 = true;
	this.Edescription = this.tasks[index].description,
	this.Edate = this.tasks[index].deadline,
	this.Eradio = this.tasks[index].priority,
	this.editedTask = index
	},

	// Add Task
	SubmitTask() {
	


	if(this.title == null || this.title.length == 0) {
	document.getElementById('title').style.backgroundColor = "red";
	document.getElementById('noti1').style.color = "red";
	this.snackbar2 = true;
	return;
	}else if(this.description == null || this.description.length == 0) {
	document.getElementById('descr').style.backgroundColor = "red";
	document.getElementById('noti2').style.color = "red";
	this.snackbar2 = true;
	return;
	}else if(this.date == null || this.date.length == 0){
	this.snackbar2 = true;
	return;
	}else if(this.radio == null || this.radio.length == 0){
	this.snackbar2 = true;
	return;
	}


	this.tasks.push({
	title: this.title,
	description: this.description,
	deadline: this.date,
	priority: this.radio,
	id: Date.now() + 4,
	})
	this.snackbar = true
	},


	updateTask() {

	if(this.Edescription.length == 0) {
	document.getElementById('descr2').style.backgroundColor = "red";
	document.getElementById('noti3').style.color = "red";
	this.snackbar2 = true;
	return;
	}else if(this.Edate.length == 0){
	this.snackbar2 = true;
	return;
	}else if(this.Eradio == null){
	this.snackbar2 = true;
	return;
	}


	this.tasks[this.editedTask].description = this.Edescription;
	this.tasks[this.editedTask].deadline = this.Edate;
	this.tasks[this.editedTask].priority = this.Eradio;
	this.snackbar = true
	},






	}







	}

</script>


<style scoped>
	.button {
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	}
</style>
