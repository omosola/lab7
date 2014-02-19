var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
    models.Project.find({"_id":projectID}).exec(afterQuery);
   
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

    var newProject = new models.Project({
	title: form_data.project_title,
	image: form_data.image_url,
	date: form_data.date,
	summary: form_data.summary
    });

    newProject.save(afterAddition);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
    function afterAddition(err) {
	if (err) {
	    console.log(err);
	    res.send(500);
	}
	res.send(200);
    }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
    models.Project
	.find({"_id":projectID})
        .remove()
	.exec(afterDeletion);

    function afterDeletion(err) {
	if(err) {
	    console.log(err);
	    res.send(500);
	}
	res.send(200);
    }
  // YOU MUST send an OK response w/ res.send();
}