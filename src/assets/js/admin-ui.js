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
          {id:"county_name", header:"County", width: 100, editor:"combo"}
        ]
      }//*/
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
      }//*/
    }, {
      header: "Location Schedules2",
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
                    loadScheduledLocations(ids[0]);
                  }
                }
              }, {
                header: "In Schedule",
                body: {
                  view: "list",
                  id: "withScheduleList"
                }
              }, {
                header: "Not In Schedule",
                body: {
                  view: "list",
                  template: "#location_name#",
                  id: "withoutScheduleList",
                  data: [
                    {location_name:"one"},
                    {location_name:"two"}
                  ]
                }
              }
            ]
          }
        ]
      }//*/
    }
  ]
});

$$("tabs").setValue("locationScheduleView");

function loadScheduledLocations(scheduleId) {
  var url = "/schedule/"+scheduleId+"/locations";
  webix.ajax()
    .get(url)
    .then(function(res) {
      $$("withScheduleList").parse(res.json().withSchedule);
      console.log($$("withoutScheduleList"));
      console.log("without", res.json().withoutSchedule);
      var withoutList = $$("withoutScheduleList");
      withoutList.clearAll();
      console.log("cleared");
      var res = withoutList.parse(res.json().withoutSchedule);
      console.log("parsed", res);
    })
}

function reset(str) {
  $$("withoutScheduleList").clearAll();
  $$("withoutScheduleList").parse([
    {location_name:"one"},
    {location_name:"three"},
    {location_name:str},
    {location_name:"two"}
  ]
);
}
