webix.editors.$popup.datetime = webix.extend({
  body:{ view:"calendar", icons:true, borderless:true, timepicker: true }
}, webix.editors.$popup.date);
webix.editors.datetime = webix.extend({
  popupType: "datetime"
}, webix.editors.date);

webix.ui({
  //*
  view:"tabview",
  header: "VoteATX Admin",
  id:"tabs",
  cells:[
    {
      header: "Locations",
      body: {
        id:"locationView",
        view: "datatable",
        //autoConfig:true,
        editable:true,
        editaction:"dblclick",
        url: '/voting_location',
        columns: [
          {id:"location_name", header:"Name", width:250, editor:"text"},
          {id:"address", header:"Address", width: 400, editor:"text"},
          {id:"county_name", header:"County", width: 100, editor:"combo"},
          {id:"schedules", header:"Schedules"}
        ]
      }
    },
    {
      header: "Schedules",
      body: {
        id:"scheduleView",
        view: "datatable",
        editable:true,
        editaction:"dblclick",
        url: '/schedule',
        columns: [
          {id:"name", header:"Name", width:250, editor:"text"},
          {id:"start", header:"Start", width: 400, editor:"datetime"},
          {id:"stop", header:"Stop", width: 400, editor: "datetime"},
        ]
      }
    }
  ]
});

$$("tabs").setValue("scheduleView");
$$("scheduleView").add({
  name: "name",
  start: new Date(),
  stop: new Date()
})
