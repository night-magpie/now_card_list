import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-template-card';

const view = (state, {updateState}) => {

	function cardListToHTML(list)
	{
		let output = [];
		
		if ((list != null) && (list.length > 0))
		{
			list.forEach(element => {
				output.push(element["getHTML"]());
			});
			return output;
		}
		else return "Loading data...";
	}

	let list = [];
	
		class IncidentEntry {
		constructor(list, iNumber, iState, iGroup, iAssignTo, iMessage) {
			this.iNumber	= iNumber;
			this.iState		= iState;
			this.iGroup		= iGroup;
			this.iAssignTo	= iAssignTo;
			this.iMessage	= iMessage;

			this.getHTML = function () {
				return (
					<now-template-card-assist
					tagline={{ "icon": "tree-view-long-outline", "label": "Incident" }}
					actions={[{ "id": "share", "label": "Copy URL" }, { "id": "close", "label": "Mark Complete" }]}
					heading={{ "label": iMessage }}
					content={[{ "label": "Number", "value": { "type": "string", "value": iNumber }}, 
							  { "label": "State", "value": { "type": "string", "value": iState } }, 
							  { "label": "Assignment group", "value": { "type": "string", "value": iGroup } }, 
							  { "label": "Assigned To", "value": { "type": "string", "value": iAssignTo } }]} 
					contentItemMinWidth="300"
					footerContent={{ "label": "Updated", "value": new Date().toLocaleString() }} 
					configAria={{}}>
					</now-template-card-assist>
				);
			};
			list.push(this);
		}
	}

	new IncidentEntry(list,"INC0000071","Open","Berries","Strawberry","We want to make jam");
	new IncidentEntry(list,"INC0000017","Open","Berries","Orange","We need fresh juice");
	new IncidentEntry(list,"INC0000070","Open","Tubers","Potato","We need some more fries");
	new IncidentEntry(list,"INC0000077","Open","Berries","Tomato","You are late for soup!");

	return (
		<div>
			{cardListToHTML(list)}
		</div>
	);
};


createCustomElement('x-550126-card-list', {
	renderer: {type: snabbdom},
	view,
	styles
});
