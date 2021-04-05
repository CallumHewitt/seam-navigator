(this["webpackJsonpseam-navigator"]=this["webpackJsonpseam-navigator"]||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(11),s=n.n(o),c=(n(16),n(2)),i=n(3),d=n(5),l=n(4),u=(n(17),n(7)),h=n(0),m=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props.id,n=t+"StopOptions",r=this.props.selected;return Object(h.jsxs)("div",{className:"input-group mb-2",children:[Object(h.jsx)("input",{type:"text",className:"form-control",value:r,list:n,placeholder:"Enter stop...",onChange:function(n){return e.props.onChange(t,n.target.value)}}),Object(h.jsx)("datalist",{id:n,children:this.props.options.map((function(e){return Object(h.jsx)("option",{value:e.label},e.id)}))}),Object(h.jsx)("button",{className:"btn btn-danger",type:"button",onClick:function(){return e.props.onDelete(t)},children:"Delete"})]})}}]),n}(r.Component),b=n(10);function p(e,t,n){var r=e.nodes[t],a=e.nodes[n];if(void 0!==r&&void 0!==a){var o=j(r,a),s=f(e,t,n),c="";if(0!==s.remainingDistance){var i;i=0===s.route.length?e.nodes[t].name:e.nodes[s.route[s.route.length-1].to].name;var d=s.remainingDistance.toLocaleString(void 0,{maximumFractionDigits:2});c="Destination could not be reached along chalked routes. Navigating to ".concat(i,". An additional ").concat(d," miles of deep black travel will be required.")}return{chalkedDistance:s.route.map((function(e){return e.distance})).reduce((function(e,t){return e+t}),0),crowDistance:o,route:s.route,from:t,to:n,warning:c}}}function j(e,t){var n=e.x-t.x,r=e.y-t.y,a=e.z-t.z;return Math.sqrt(Math.pow(n,2)+Math.pow(r,2)+Math.pow(a,2))}function f(e,t,n){if(t===n)return{route:[],remainingDistance:0};var r={},a={},o=new Set(Object.keys(e.nodes)),s={};for(o.forEach((function(e){r[e]=Number.MAX_VALUE,a[e]=void 0,s[e]=[]})),e.edges.forEach((function(e){var t=e[0],n=e[1];s[t].push(n),s[n].push(t)})),r[t]=0;o.size>0;){var c=Object.keys(r).filter((function(e){return o.has(e)})).reduce((function(e,t){return r[t]<r[e]?t:e}));o.delete(c);var i,d=Object(b.a)(s[c]);try{for(d.s();!(i=d.n()).done;){var l=i.value,u=j(e.nodes[c],e.nodes[l]),h=r[c]+u;h<r[l]&&(r[l]=h,a[l]=[c,u])}}catch(g){d.e(g)}finally{d.f()}}if(void 0===a[n]){var m=function(e,t,n){var r,a,o=Number.MAX_VALUE,s=Object(b.a)(n);try{for(s.s();!(a=s.n()).done;){var c=a.value,i=j(e.nodes[c],e.nodes[t]);i<o&&(o=i,r=c)}}catch(g){s.e(g)}finally{s.f()}return{node:r,distance:o}}(e,n,Object.keys(r).filter((function(e){return r[e]!==Number.MAX_VALUE}))),p=f(e,t,m.node);return console.log(p),{route:p.route,remainingDistance:m.distance}}return{route:v(a,n),remainingDistance:0}}function v(e,t){for(var n=t,r=[];void 0!==e[n];){var a=e[n];r.push({to:n,from:a[0],distance:a[1]}),n=a[0]}return r.reverse()}var g=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props.leg;return Object(h.jsxs)("div",{className:"card mb-2",children:[Object(h.jsx)("div",{className:"card-header",children:Object(h.jsx)("h5",{className:"mb-0",children:t.from+" to "+t.to})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsxs)("p",{className:"mb-0",children:[Object(h.jsx)("b",{children:"Chalks:"})," ",this.formatDistance(t.chalkedDistance)]}),Object(h.jsxs)("p",{className:"mb-0",children:[Object(h.jsx)("b",{children:"Direct:"})," ",this.formatDistance(t.crowDistance)]}),Object(h.jsx)("p",{className:"mb-0",children:Object(h.jsx)("b",{children:"Route:"})}),Object(h.jsx)("ul",{className:"ml-4",children:t.route.map((function(t){return Object(h.jsxs)("li",{children:[t.from," -> ",t.to," (",e.formatDistance(t.distance),")"]},t.from+t.to)}))}),!!t.warning&&Object(h.jsx)("div",{className:"alert alert-warning",children:t.warning})]})]},t.from+t.to)}},{key:"formatDistance",value:function(e){return e.toLocaleString(void 0,{maximumFractionDigits:2})+" miles"}}]),n}(r.Component),O=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(e){var r;Object(c.a)(this,n),(r=t.call(this,e)).handleChangeStop=function(e,t){var n=r.getIdFromLabel(t),a=Object(u.a)(r.state.route);a[e]=n,r.setState({route:a})},r.handleDeleteStop=function(e){if(r.state.route.length>1){var t=Object(u.a)(r.state.route);t.splice(e,1),r.setState({route:t})}},r.handleAddStop=function(){r.setState((function(e){return{route:[].concat(Object(u.a)(e.route),[""])}}))};var a=e.map,o=e.map.nodes,s=Object.keys(o).filter((function(e){return!o[e].hidden})).map((function(e){return{id:e,label:o[e].name}}));return r.state={map:a,stops:s,route:["",""],distance:0},r}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.state.route,n="accordion";return Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-sm-4",children:[Object(h.jsx)("button",{className:"btn btn-primary my-2",onClick:this.handleAddStop,children:"Add Stop"}),Object(h.jsx)("ul",{children:t.map((function(t,n){return Object(h.jsx)(m,{id:n,options:e.state.stops,selected:e.getLabelFromId(t),onChange:e.handleChangeStop,onDelete:e.handleDeleteStop},n)}))})]}),Object(h.jsx)("div",{id:n,className:"col-sm-6",children:this.calculateLegs().map((function(e){return Object(h.jsx)(g,{leg:e,dataParent:n},e.to+e.from)}))})]})}},{key:"getIdFromLabel",value:function(e){var t=this.state.stops.find((function(t){return t.label===e}));return t?t.id:void 0}},{key:"getLabelFromId",value:function(e){var t=this.state.stops.find((function(t){return t.id===e}));return t?t.label:""}},{key:"calculateLegs",value:function(){var e=this,t=this.state.route;return Object(u.a)(Array(t.length-1).keys()).map((function(n){return e.calculateLeg(t[n],t[n+1])})).filter((function(e){return void 0!==e}))}},{key:"calculateLeg",value:function(e,t){var n=this,r=p(this.state.map,e,t);return void 0!==r&&(r.from=this.getLabelFromId(r.from),r.to=this.getLabelFromId(r.to),r.route.forEach((function(e){e.from=n.getLabelFromId(e.from),e.to=n.getLabelFromId(e.to)}))),console.log(r),r}}]),n}(r.Component),x={nodes:{velour:{name:"Velour",x:0,y:0,z:0,hidden:!1},jacquard:{name:"Jacquard",x:-321,y:731,z:146,hidden:!1},poplin:{name:"Poplin",x:282,y:423,z:173,hidden:!1},gathernotch:{name:"Gathernotch",x:1079,y:501,z:589,hidden:!1},leewardCrossroads:{name:"The Leeward Crossroads",x:2e3,y:0,z:0,hidden:!1},windwardCrossroads:{name:"The Windward Crossroads",x:-2e3,y:0,z:0,hidden:!1},upperWyroads:{name:"The Upper Wyroads",x:0,y:2e3,z:0,hidden:!1},lowerWyroads:{name:"The Lower Wyroads",x:0,y:-2e3,z:0,hidden:!1},starboardZeeroads:{name:"The Starboard Zeeroads",x:0,y:0,z:2e3,hidden:!1},portZeeroads:{name:"The Port Zeeroads",x:0,y:0,z:-2e3,hidden:!1},hopsack:{name:"Hopsack",x:851,y:1532,z:-2973,hidden:!1},caves:{name:"The Caves",x:-1589,y:1623,z:-963,hidden:!0},tambour:{name:"Tambour",x:-731,y:-2531,z:891,hidden:!1}},edges:[["velour","jacquard"],["velour","poplin"],["velour","gathernotch"],["velour","upperWyroads"],["velour","lowerWyroads"],["velour","windwardCrossroads"],["velour","leewardCrossroads"],["velour","starboardZeeroads"],["velour","portZeeroads"],["poplin","gathernotch"],["portZeeroads","hopsack"],["lowerWyroads","tambour"]]},y=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={map:x},e}return Object(i.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(a.a.Fragment,{children:[Object(h.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-light",children:Object(h.jsx)("h2",{children:"Seam Navigator"})}),Object(h.jsx)("div",{className:"container-lg m-3",children:Object(h.jsx)(O,{map:x})})]})}}]),n}(r.Component);n(19);s.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(y,{})}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.579a92ae.chunk.js.map