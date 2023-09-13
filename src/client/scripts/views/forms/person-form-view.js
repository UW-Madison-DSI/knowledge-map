/******************************************************************************\
|                                                                              |
|                             person-form-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form for editing information for people.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import FormView from './form-view.js';

export default FormView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div class="name form-group">
			<label class="control-label">Name</label>
			<div class="controls">
				<div class="input-group">
					<input type="text" class="form-control" id="first-name" placeholder="First">
					<span class="input-group-addon"></span>
					<input type="text" class="form-control" id="middle-name" placeholder="Middle">
					<span class="input-group-addon"></span>
					<input type="text" class="form-control" id="last-name" placeholder="Last">
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-3">
				<div class="form-group">
					<label for="title">Title</label>
					<div class="input-group">
						<select id="title">
							<option value="">None</option>
							<option value="professor">Professor</option>
							<option value="associate professor">Associate Professor</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-5">
				<div class="form-group">
					<label for="title">Department</label>
					<div class="input-group">
						<select id="department" style="max-width:50%">
							<option value="">None</option>
							<% for (let i = 0; i < departments.length; i++) { %>
							<% let department = departments.at(i); %>
							<option value="<%= department.get('id') %>"><%= department.get('name').toTitleCase() %></option>
							<% } %>
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="form-group">
					<label for="password">Password</label>
					<div class="input-group">
						<input type="password" class="required form-control" id="password">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Password" data-content="This is used to restrict others from being able to modify or delete your information."></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-9">
				<div class="form-group">
					<label for="degree-institution">Degree Institution</label>
					<div class="input-group">
						<input type="text" class="form-control" id="degree-institution">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Degree Institution" data-content="This is the name of the institution that you graduated from."></i>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="form-group">
					<label for="degree-year">Degree Year</label>
					<div class="input-group">
						<input type="text" class="form-control" id="degree-year">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Degree Year" data-content="This is the year that you graduated."></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label for="middle-name">Research Interests</label>
			<div class="input-group">
				<input type="text" class="form-control" id="research-interests">
				<div class="input-group-addon">
					<i class="active fa fa-question-circle" data-toggle="popover" title="Research Interests" data-content="This is a comma separated list of research topics of interest to you."></i>
				</div>	
			</div>
		</div>
	`),

	//
	// getting methods
	//

	setValue: function(key, value) {
		switch (key) {
			case 'first_name':
				this.$el.find('#first-name').val(value);
				break;
			case 'middle_name':
				this.$el.find('#middle-name').val(value);
				break;
			case 'last_name':
				this.$el.find('#last-name').val(value);
				break;
			case 'title':
				this.$el.find('#title').val(value? value.toLowerCase() : undefined);
				break;
			case 'department':
				this.$el.find('#department').val(value);
				break;			
			case 'primary_affiliation':
				this.$el.find('#department').val(value);
				break;
			case 'degree_institution':
				this.$el.find('#degree-institution').val(value);
				break;
			case 'degree_year':
				this.$el.find('#degree-year').val(value);
				break;
			case 'research_interests':
				this.$el.find('#research-interests').val(value);
				break;
		}
	},

	setValues: function(attributes) {
		let keys = Object.keys(attributes);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = attributes[key];
			this.setValue(key, value);
		}
	},

	getValues: function() {
		return {
			title: this.$el.find('#title').val(),
			password: this.$el.find('#password').val(),
			first_name: this.$el.find('#first-name').val(),
			middle_name: this.$el.find('#middle-name').val(),
			last_name: this.$el.find('#last-name').val(),
			primary_unit_affiliation_id: this.$el.find('#department').val(),
			degree_institution: this.$el.find('#degree-institution').val(),
			degree_year: this.$el.find('#degree-year').val(),
			research_terms: this.$el.find('#research-interests').val(),
			password: this.$el.find('#password').val()
		};
	},

	getDepartmentId: function(name) {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');
		let departments = mapView.departments;
		for (let i = 0; i < departments.length; i++) {
			let department = departments.at(i);
			if (department.get('base_name') == name) {
				return department.get('id');
			}
		}
	},

	//
	// rendering methods
	//

	templateContext: function() {
		let topView = this.getTopView();
		let mainView = topView.getChildView('mainbar');
		let mapView = mainView.getChildView('mainbar');

		return {
			departments: mapView.departments
		}
	},

	onRender: function() {

		// call superclass method
		//
		FormView.prototype.onRender.call(this);

		// initialize form
		//
		this.setValues({
			title: this.model.get('title'),
			password: this.model.get('password'),
			first_name: this.model.get('first_name'),
			middle_name: this.model.get('middle_name'),
			last_name: this.model.get('last_name'),
			department: this.getDepartmentId(this.model.get('primary_affiliation')),
			degree_institution: this.model.get('degree_institution'),
			degree_year: this.model.get('degree_year'),
			research_interests: this.model.get('terms')
		});
	}
});