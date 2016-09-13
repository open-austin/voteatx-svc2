webix.ui({
  rows:[
    {
      view:"template",
      type:"header",
      template:"My App!"
    },
    {
      view:"tabbar",
      id:'tabbar',
      value:'formView',
      multiview:true,
      options: [
        { value: 'Locations', id: 'formView'},
        { value: 'Schedules', id: 'emptyView'}
      ]
    },
    {
      cells:[
        {
          id:"formView",
          view: "datatable",
          template:"Form Content",
          //autoConfig:true,
          editable:true,
          editaction:"dblclick",
          url: '/voting_location'
          //*
          ,
          columns: [
            {id:"location_name", header:"Name", width:250, editor:"text"},
            {id:"address", header:"Address", width: 400, editor:"text"},
            {id:"county_name", header:"County", width: 100, editor:"combo"},
            {id:"schedules", header:"Schedules"}
          ]
          //*/
        },
        {
          id:"emptyView",
          template:"Some content"
        }
      ]}
    ]
});
