webix.editors.$popup.datetime = webix.extend({
  body:{ view:"calendar", icons:true, borderless:true, timepicker: true }
}, webix.editors.$popup.date);
webix.editors.datetime = webix.extend({
  popupType: "datetime"
}, webix.editors.date);
webix.proxy("rest", "/schedule");

function parseDate(input) {
  return new Date(input);
}

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
    }, {
      header: "Schedules",
      body: {
        id:"scheduleView",
        view: "datatable",
        editable:true,
        editaction:"dblclick",
        url: '/schedule',
        save: 'rest->/schedule',
        scheme: {
          $init: function(obj) {
            obj.start = new Date(obj.start);
            obj.stop = new Date(obj.stop);
          }
        },
        columns: [
          {id:"name", header:"Name", width:250, editor:"text"},
          {id:"start", header:"Start", width: 400, editor:"datetime"},
          {id:"stop", header:"Stop", width: 400, editor: "datetime"}
        ],
        on: {
          onAfterEditStop: function(state, editor, ignoreUpdate) {
            console.log("new state: ", state);
            console.log(editor);
          },
          onLiveEdit: function(state, editor) {
            console.log("onLiveEdit", state, editor);
          },
          onEditorChange: function(id, value) {
            console.log("onEditorChange", id, value);
          }
        }
      }
    }, {
      header: "Location Schedules",
      body: {
        id: "locationScheduleView",
        type: "space",
        rows: [
          {
            cols: [
              {
                view: "list",
                template: "#name#",
                select: true,
                url: "/schedule",
                on: {
                  onSelectChange: function(ids) {
                    console.log("onSelectChange", ids);
                  }
                }
              }, {
                header: "In Schedule",
                body: {
                  view: "list"
                }
              }, {
                header: "Not In Schedule",
                body: {
                  view: "list"
                }
              }
            ]
          }
        ]
      }
    }
  ]
});

$$("tabs").setValue("locationScheduleView");
/*
$$("scheduleView").add({
  name: "name",
  start: new Date(),
  stop: new Date()
})
*/

/*
webix.ajax().post("/schedule", {
  name: "name",
  start: new Date(),
  stop: new Date()
}).then(function(res) {
  // refresh datatable
  console.log("done");
  $$("scheduleView").load(res.json())
});
*/
