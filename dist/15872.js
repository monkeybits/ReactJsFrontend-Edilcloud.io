(self.webpackChunkfuse_react_app=self.webpackChunkfuse_react_app||[]).push([[15872],{47442:function(e,n,t){"use strict";t.d(n,{Z:function(){return k}});var a=t(61432),i=t.n(a),o=t(78709),l=t(32986),s=t(94678),m=t(84403),c=t(20103),u=t(82707),d=t(96282),r=t(16526),n=t.n(r),a=t(79545),v=t.n(a),r=t(82853),p=t.n(r),a=t(82147),f=t.n(a),r=t(40734),h=t.n(r),a=t(38050),E=t.n(a),r=t(3056),b=t.n(r),a=t(71470),y=t.n(a),r=t(56156),g=t.n(r),a=t(77035),N=t(26895),Z=t(75964),F=t(96450),r=t(6274),x=t(66015),M=t(7202),w=t(34948);function C(n,e){var t,a=Object.keys(n);return Object.getOwnPropertySymbols&&(t=Object.getOwnPropertySymbols(n),e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),a.push.apply(a,t)),a}function R(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?C(Object(t),!0).forEach(function(e){g()(n,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):C(Object(t)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))})}return n}function q(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,n=y()(t);return n=a?(e=y()(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),b()(this,n)}}var O=(0,a.Z)({productionPrefix:"iframe-"}),a=function(e){E()(r,e);var l=q(r);function r(){var n;p()(this,r);for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return n=l.call.apply(l,[this].concat(t)),g()(h()(n),"state",{ready:!1}),g()(h()(n),"handleRef",function(e){n.contentDocument=e?e.node.contentDocument:null}),g()(h()(n),"onContentDidMount",function(){n.setState({ready:!0,jss:(0,x.Ue)(R(R({},(0,N.Z)()),{},{plugins:[].concat(v()((0,N.Z)().plugins),[(0,M.Z)()]),insertionPoint:n.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:n.contentDocument.body})}),g()(h()(n),"onContentDidUpdate",function(){n.contentDocument.body.dir=n.props.theme.direction}),g()(h()(n),"renderHead",function(){return o.createElement(o.Fragment,null,o.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Poppins, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),o.createElement("noscript",{id:"jss-demo-insertion-point"}))}),n}return f()(r,[{key:"render",value:function(){var e=this.props,n=e.children,t=e.classes,e=e.theme;return o.createElement(w.ZP,{head:this.renderHead(),ref:this.handleRef,className:t.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?o.createElement(Z.ZP,{jss:this.state.jss,generateClassName:O,sheetsManager:this.state.sheetsManager},o.createElement(F.Z,{theme:e},o.cloneElement(n,{container:this.state.container}))):null)}}]),r}(o.Component);a.propTypes={children:n().node.isRequired,classes:n().object.isRequired,theme:n().object.isRequired};var I=(0,r.Z)(function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}},{withTheme:!0})(a),P=(0,l.ZP)(function(){return Promise.resolve().then(t.bind(t,22482))}),n={raw:n().object,currentTabIndex:n().number};function S(e){var n=(0,o.useState)(e.currentTabIndex),t=i()(n,2),a=t[0],l=t[1],r=e.component,n=e.raw,t=e.iframe,e=e.className;return o.createElement(s.Z,{className:e},o.createElement(m.Z,{position:"static",color:"default",elevation:0},o.createElement(c.Z,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:a,onChange:function(e,n){l(n)}},r&&o.createElement(u.Z,{classes:{root:"min-w-64"},icon:o.createElement(d.Z,null,"remove_red_eye")}),n&&o.createElement(u.Z,{classes:{root:"min-w-64"},icon:o.createElement(d.Z,null,"code")}))),o.createElement("div",{className:"flex justify-center"},o.createElement("div",{className:0===a?"flex flex-1":"hidden"},r&&(t?o.createElement(I,null,o.createElement(r,null)):o.createElement("div",{className:"p-24 flex flex-1 justify-center"},o.createElement(r,null)))),o.createElement("div",{className:1===a?"flex flex-1":"hidden"},n&&o.createElement("div",{className:"flex flex-1"},o.createElement(P,{component:"pre",className:"language-javascript w-full"},n.default)))))}S.propTypes=n,S.defaultProps={currentTabIndex:0};var k=S},25950:function(e,n,t){"use strict";t.d(n,{ek:function(){return v},AE:function(){return M},o:function(){return h},Cv:function(){return Z},Op:function(){return s}});var a=t(51265),l=t.n(a),r=t(78709),i=t(65129),o=t(82186),n=t(62902);var s=r.memo((0,n.withFormsy)(function(n){var e=i.Z.pick(n,["autoComplete","autoFocus","children","className","defaultValue","disabled","FormHelperTextProps","fullWidth","id","InputLabelProps","inputProps","InputProps","inputRef","label","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","rowsMax","select","SelectProps","type","variant"]),t=n.errorMessage,a=n.value||"";return r.createElement(o.Z,l()({},e,{onChange:function(e){n.setValue(e.currentTarget.value),n.onChange&&n.onChange(e)},value:a,error:Boolean(!n.isPristine&&n.showRequired||t),helperText:t}))})),m=t(41533),c=t(556),u=t(5344),d=t(23726);var v=r.memo((0,n.withFormsy)(function(n){var e=i.Z.pick(n,["checkedIcon","classes","color","disabled","disableRipple","icon","id","indeterminate","indeterminateIcon","inputProps","inputRef","onChange","variant"]),t=n.errorMessage,a=n.value;return r.createElement(m.Z,{error:Boolean(!n.isPristine&&n.showRequired||t),className:n.className},r.createElement(c.Z,{control:r.createElement(u.Z,l()({},e,{type:"checkbox",checked:a,onChange:function(e){n.setValue(e.target.checked),n.onChange&&n.onChange(e)}})),label:n.label}),Boolean(t)&&r.createElement(d.Z,null,t))})),p=t(50385),f=t(58889);var h=r.memo((0,n.withFormsy)(function(t){var e=i.Z.pick(t,["children","name","onBlur","onChange","onKeyDown","variant"]),n=t.errorMessage,a=t.value;return r.createElement(m.Z,{error:Boolean(!t.isPristine&&t.showRequired||n),className:t.className},r.createElement(m.Z,{component:"fieldset",required:t.required,error:Boolean(n)},t.label&&r.createElement(p.Z,{component:"legend"},t.label),r.createElement(f.Z,l()({},e,{value:a||null,onChange:function(e,n){t.setValue(n),t.onChange&&t.onChange(e)}})),Boolean(n)&&r.createElement(d.Z,null,n)))})),E=t(25715),b=t(91493),y=t(38932),g=t(50390),N=t(71871);var Z=r.memo((0,n.withFormsy)(function(n){var e=i.Z.pick(n,["autoWidth","children","classes","displayEmpty","input","inputProps","MenuProps","multiple","native","onChange","onClose","onOpen","open","renderValue","SelectDisplayProps","value","variant"]),t=n.errorMessage,a=n.value;return r.createElement(m.Z,{error:Boolean(!n.isPristine&&n.showRequired||t),className:n.className,variant:e.variant},n.label&&r.createElement(g.Z,{htmlFor:n.name},n.label),r.createElement(N.Z,l()({},e,{value:a,onChange:function(e){n.setValue(e.target.value),n.onChange&&n.onChange(e)},input:function(){switch(e.variant){case"outlined":return r.createElement(E.Z,{labelWidth:8*n.label.length,id:n.name});case"filled":return r.createElement(b.Z,{id:n.name});default:return r.createElement(y.Z,{id:n.name})}}()})),Boolean(t)&&r.createElement(d.Z,null,t))})),a=t(32986),F=t(28344),x=(0,a.ZP)(function(){return Promise.all([t.e(51446),t.e(45489),t.e(8599)]).then(t.bind(t,92505))});var M=r.memo((0,n.withFormsy)(function(t){var e=i.Z.pick(t,["children","classes","className","defaultValue","disabled","fullWidth","id","label","name","onBlur","onChange","onFocus","placeholder","required","textFieldProps","variant","isMulti","options","errorMessage"]),n=t.errorMessage,a=t.value;return r.createElement(m.Z,{error:Boolean(!t.isPristine&&t.showRequired||n),className:(0,F.Z)(t.className,"z-10",t.showRequired?"required":"",t.showError?"error":null),variant:e.variant},t.label&&r.createElement(g.Z,{htmlFor:t.name},t.label),r.createElement(x,l()({},e,{value:a,onChange:function(e,n){t.multiple?t.setValue(n.map(function(e){return e.value})):t.setValue(e)},error:Boolean(!t.isPristine&&t.showRequired||n)})),Boolean(n)&&r.createElement(d.Z,null,n))}))},15872:function(e,n,t){"use strict";t.r(n);var a=t(47442),l=t(23377),r=t(13786),i=t(96282),o=t(92466),s=t(78709),m=t(12707);n.default=function(){return s.createElement(l.Z,{header:s.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},s.createElement("div",{className:"flex flex-col"},s.createElement("div",{className:"flex items-center mb-16"},s.createElement(i.Z,{className:"text-18",color:"action"},"home"),s.createElement(i.Z,{className:"text-16",color:"action"},"chevron_right"),s.createElement(o.Z,{color:"textSecondary"},"Documentation"),s.createElement(i.Z,{className:"text-16",color:"action"},"chevron_right"),s.createElement(o.Z,{color:"textSecondary"},"3rd Party Components")),s.createElement(o.Z,{variant:"h6"},"Formsy")),s.createElement(r.Z,{className:"normal-case",variant:"contained",component:"a",href:"https://github.com/formsy/formsy-react",target:"_blank",role:"button"},s.createElement(i.Z,null,"link"),s.createElement("span",{className:"mx-4"},"Reference"))),content:s.createElement("div",{className:"p-24 max-w-2xl"},s.createElement(o.Z,{className:"mb-16",component:"p"},s.createElement("code",null,"formsy-react")," is a form input builder and validator for React."),s.createElement(o.Z,{className:"mb-16",component:"p"},"HOCs are needed for formsy to work. We created for TextField, Select, RadioGroup, Checkbox under @fuse."),s.createElement("hr",null),s.createElement(o.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Example Usages"),s.createElement(a.Z,{className:"mb-64",component:t(26019).Z,raw:t(899)}),s.createElement(o.Z,{className:"text-32 mt-32 mb-8",component:"h2"},"Demos"),s.createElement("ul",null,s.createElement("li",{className:"mb-8"},s.createElement(m.rU,{to:"/login"},"Login page"))))})}},26019:function(e,n,t){"use strict";var a=t(61432),l=t.n(a),r=t(25950),i=t(13786),o=t(556),s=t(41713),m=t(64584),c=t(92466),a=t(62902),u=t.n(a),d=t(78709),v=["Sea","Sky","Forest","Aerial","Art"].map(function(e){return{value:e,label:e}});n.Z=function(){var e=(0,d.useState)(!1),e=(t=l()(e,2))[0],n=t[1],t=(0,d.useRef)(null);return d.createElement("div",{className:"max-w-sm"},d.createElement(c.Z,{className:"h2 mb-24"},"Example Formsy Form"),d.createElement(u(),{onValidSubmit:function(e){console.info("submit",e)},onValid:function(){n(!0)},onInvalid:function(){n(!1)},ref:t,className:"flex flex-col justify-center"},d.createElement(r.Op,{className:"mb-16",type:"text",name:"name",label:"Name",validations:{minLength:4},validationErrors:{minLength:"Min character length is 4"},required:!0}),d.createElement(r.Op,{className:"my-16",type:"text",name:"email",label:"Email",validations:{isEmail:!0},validationErrors:{isEmail:"This is not a valid email"},required:!0}),d.createElement(r.Op,{className:"my-16",type:"text",name:"name-outlined",label:"Name (Outlined)",validations:{minLength:4},validationErrors:{minLength:"Min character length is 4"},required:!0,variant:"outlined"}),d.createElement(r.Op,{className:"my-16",type:"text",name:"email-outlined",label:"Email (Outlined)",validations:{isEmail:!0},validationErrors:{isEmail:"This is not a valid email"},required:!0,variant:"outlined"}),d.createElement(r.Op,{className:"my-16",type:"text",name:"name-filled",label:"Name (Filled)",validations:{minLength:4},validationErrors:{minLength:"Min character length is 4"},required:!0,variant:"filled"}),d.createElement(r.Op,{className:"my-16",type:"text",name:"email-filled",label:"Email (Filled)",validations:{isEmail:!0},validationErrors:{isEmail:"This is not a valid email"},required:!0,variant:"filled"}),d.createElement(r.o,{className:"my-16",name:"gender",label:"Gender",validations:"equals:female",validationError:"Only ladies are accepted",required:!0},d.createElement(o.Z,{value:"male",control:d.createElement(m.Z,{color:"primary"}),label:"Male"}),d.createElement(o.Z,{value:"female",control:d.createElement(m.Z,{color:"primary"}),label:"Female"}),d.createElement(o.Z,{value:"other",control:d.createElement(m.Z,{color:"primary"}),label:"Other"}),d.createElement(o.Z,{value:"disabled",disabled:!0,control:d.createElement(m.Z,null),label:"(Disabled option)"})),d.createElement(r.Cv,{className:"my-16",name:"related",label:"Related with",value:"none",validations:"equals:none",validationError:"Must be None"},d.createElement(s.Z,{value:"none"},d.createElement("em",null,"None")),d.createElement(s.Z,{value:"hai"},"Hai"),d.createElement(s.Z,{value:"olivier"},"Olivier"),d.createElement(s.Z,{value:"kevin"},"Kevin")),d.createElement(r.Cv,{className:"my-16",name:"related-outlined",label:"Related with (Outlined)",value:"none",validations:"equals:none",validationError:"Must be None",variant:"outlined"},d.createElement(s.Z,{value:"none"},d.createElement("em",null,"None")),d.createElement(s.Z,{value:"hai"},"Hai"),d.createElement(s.Z,{value:"olivier"},"Olivier"),d.createElement(s.Z,{value:"kevin"},"Kevin")),d.createElement(r.Cv,{className:"my-16",name:"related-filled",label:"Related with (Filled)",value:"none",validations:"equals:none",validationError:"Must be None",variant:"filled"},d.createElement(s.Z,{value:"none"},d.createElement("em",null,"None")),d.createElement(s.Z,{value:"hai"},"Hai"),d.createElement(s.Z,{value:"olivier"},"Olivier"),d.createElement(s.Z,{value:"kevin"},"Kevin")),d.createElement(r.ek,{className:"my-16",name:"accept",value:!1,label:"Accept",validations:{equals:!0},validationErrors:{equals:"You need to accept"}}),d.createElement(r.AE,{className:"my-16",name:"tags",placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"standard"},options:v,isMulti:!0,validations:{minLength:2},validationErrors:{minLength:"You need to select at least two"},required:!0}),d.createElement(i.Z,{type:"submit",variant:"contained",color:"primary",className:"mx-auto mt-32 mb-80","aria-label":"LOG IN",disabled:!e},"Can submit")))}},899:function(e,n,t){"use strict";t.r(n),n.default='import {\n    CheckboxFormsy,\n    FuseChipSelectFormsy,\n    RadioGroupFormsy,\n    SelectFormsy,\n    TextFieldFormsy\n} from \'@fuse/core/formsy\';\nimport Button from \'@material-ui/core/Button\';\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\nimport MenuItem from \'@material-ui/core/MenuItem\';\nimport Radio from \'@material-ui/core/Radio\';\nimport Typography from \'@material-ui/core/Typography\';\nimport Formsy from \'formsy-react\';\nimport React, {useRef, useState} from \'react\';\n\nconst suggestions = [\'Sea\', \'Sky\', \'Forest\', \'Aerial\', \'Art\'].map(item => ({\n    value: item,\n    label: item\n}));\n\nfunction SimpleFormExample()\n{\n    const [isFormValid, setIsFormValid] = useState(false);\n    const formRef = useRef(null);\n\n    function disableButton()\n    {\n        setIsFormValid(false);\n    }\n\n    function enableButton()\n    {\n        setIsFormValid(true);\n    }\n\n    function handleSubmit(model)\n    {\n        console.info(\'submit\', model);\n    }\n\n    return (\n        <div className="max-w-sm">\n            <Typography className="h2 mb-24">Example Formsy Form</Typography>\n            <Formsy\n                onValidSubmit={handleSubmit}\n                onValid={enableButton}\n                onInvalid={disableButton}\n                ref={formRef}\n                className="flex flex-col justify-center"\n            >\n                <TextFieldFormsy\n                    className="mb-16"\n                    type="text"\n                    name="name"\n                    label="Name"\n                    validations={{\n                        minLength: 4,\n                    }}\n                    validationErrors={{\n                        minLength: \'Min character length is 4\',\n                    }}\n                    required\n                />\n\n                <TextFieldFormsy\n                    className="my-16"\n                    type="text"\n                    name="email"\n                    label="Email"\n\t\t\t\t\tvalidations={{\n\t\t\t\t\t\tisEmail: true,\n\t\t\t\t\t}}\n\t\t\t\t\tvalidationErrors={{\n\t\t\t\t\t\tisEmail: "This is not a valid email"\n\t\t\t\t\t}}\n                    required\n                />\n\n                <TextFieldFormsy\n                    className="my-16"\n                    type="text"\n                    name="name-outlined"\n                    label="Name (Outlined)"\n                    validations={{\n                        minLength: 4\n                    }}\n                    validationErrors={{\n                        minLength: \'Min character length is 4\'\n                    }}\n                    required\n                    variant="outlined"\n                />\n\n                <TextFieldFormsy\n                    className="my-16"\n                    type="text"\n                    name="email-outlined"\n                    label="Email (Outlined)"\n\t\t\t\t\tvalidations={{\n\t\t\t\t\t\tisEmail: true,\n\t\t\t\t\t}}\n\t\t\t\t\tvalidationErrors={{\n\t\t\t\t\t\tisEmail: "This is not a valid email"\n\t\t\t\t\t}}\n                    required\n                    variant="outlined"\n                />\n\n                <TextFieldFormsy\n                    className="my-16"\n                    type="text"\n                    name="name-filled"\n                    label="Name (Filled)"\n                    validations={{\n                        minLength: 4\n                    }}\n                    validationErrors={{\n                        minLength: \'Min character length is 4\'\n                    }}\n                    required\n                    variant="filled"\n                />\n\n                <TextFieldFormsy\n                    className="my-16"\n                    type="text"\n                    name="email-filled"\n                    label="Email (Filled)"\n\t\t\t\t\tvalidations={{\n\t\t\t\t\t\tisEmail: true,\n\t\t\t\t\t}}\n\t\t\t\t\tvalidationErrors={{\n\t\t\t\t\t\tisEmail: "This is not a valid email"\n\t\t\t\t\t}}\n                    required\n                    variant="filled"\n                />\n\n                <RadioGroupFormsy\n                    className="my-16"\n                    name="gender"\n                    label="Gender"\n                    validations="equals:female"\n                    validationError="Only ladies are accepted"\n                    required\n                >\n                    <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male"/>\n                    <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female"/>\n                    <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other"/>\n                    <FormControlLabel value="disabled" disabled control={<Radio/>} label="(Disabled option)"/>\n                </RadioGroupFormsy>\n\n                <SelectFormsy\n                    className="my-16"\n                    name="related"\n                    label="Related with"\n                    value="none"\n                    validations="equals:none"\n                    validationError="Must be None"\n                >\n                    <MenuItem value="none">\n                        <em>None</em>\n                    </MenuItem>\n                    <MenuItem value="hai">Hai</MenuItem>\n                    <MenuItem value="olivier">Olivier</MenuItem>\n                    <MenuItem value="kevin">Kevin</MenuItem>\n                </SelectFormsy>\n\n                <SelectFormsy\n                    className="my-16"\n                    name="related-outlined"\n                    label="Related with (Outlined)"\n                    value="none"\n                    validations="equals:none"\n                    validationError="Must be None"\n                    variant="outlined"\n                >\n                    <MenuItem value="none">\n                        <em>None</em>\n                    </MenuItem>\n                    <MenuItem value="hai">Hai</MenuItem>\n                    <MenuItem value="olivier">Olivier</MenuItem>\n                    <MenuItem value="kevin">Kevin</MenuItem>\n                </SelectFormsy>\n\n                <SelectFormsy\n                    className="my-16"\n                    name="related-filled"\n                    label="Related with (Filled)"\n                    value="none"\n                    validations="equals:none"\n                    validationError="Must be None"\n                    variant="filled"\n                >\n                    <MenuItem value="none">\n                        <em>None</em>\n                    </MenuItem>\n                    <MenuItem value="hai">Hai</MenuItem>\n                    <MenuItem value="olivier">Olivier</MenuItem>\n                    <MenuItem value="kevin">Kevin</MenuItem>\n                </SelectFormsy>\n\n                <CheckboxFormsy\n                    className="my-16"\n                    name="accept"\n                    value={false}\n                    label="Accept"\n\t\t\t\t\tvalidations={{\n\t\t\t\t\t\tequals: true,\n\t\t\t\t\t}}\n\t\t\t\t\tvalidationErrors={{\n\t\t\t\t\t\tequals: "You need to accept"\n\t\t\t\t\t}}\n                />\n\n                <FuseChipSelectFormsy\n                    className="my-16"\n                    name="tags"\n                    placeholder="Select multiple tags"\n                    textFieldProps={{\n                        label          : \'Tags\',\n                        InputLabelProps: {\n                            shrink: true\n                        },\n                        variant        : \'standard\'\n                    }}\n                    options={suggestions}\n                    isMulti\n                    validations={{minLength: 2}}\n                    validationErrors={{\n                        minLength: \'You need to select at least two\'\n                    }}\n                    required\n                />\n\n                <Button\n                    type="submit"\n                    variant="contained"\n                    color="primary"\n                    className="mx-auto mt-32 mb-80"\n                    aria-label="LOG IN"\n                    disabled={!isFormValid}\n                >\n                    Can submit\n                </Button>\n            </Formsy>\n        </div>\n    );\n}\n\nexport default SimpleFormExample;\n'}}]);