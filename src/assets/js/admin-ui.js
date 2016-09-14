webix.ui({
  view:"tabview",
  header: "VoteATX Admin",
  id:'tabbar',
  cells:[
    {
      id:"locationView",
      header: "Locations",
      view: "datatable",
      //autoConfig:true,
      editable:true,
      editaction:"dblclick",
      url: '/voting_location'
      //*
      ,
      columns: [
        {id:"location_name", header:"Name", width:250, editor:"text"},
        {id:"address", header:"Address", width: 400, editor:"text"},
        //{id:"county_name", header:"County", width: 100, editor:"combo"},
        {id:"schedules", header:"Schedules"}
      ]
      //*/
    },
    {
      id:"scheduleView",
      header: "Schedules",
      view: "datatable",
      editable:true,
      editaction:"dblclick",
      url: '/voting_location',
      columns: [
        {id:"location_name", header:"Name", width:250, editor:"text"},
        {id:"address", header:"Address", width: 400, editor:"text"},
        {id:"county_name", header:"County", width: 100, editor:"combo"}
      ]
    }
  ]
});
