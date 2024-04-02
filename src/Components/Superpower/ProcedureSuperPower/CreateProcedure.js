import React, { useEffect, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "../../InputFields/MultiSelectField";
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import { Spinner } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import ReactFlowChart from "@/Helper/ReactFlowChart";

const CreateProcedure = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [procedureName, setProcedureName] = useState("")
  const [actions, setActions] = useState([])
  const [procedureRequirement, setProcedureRequirement] = useState("");
  const [procedurePrompt, setProcedurePrompt] = useState(`This manual provides instructions on how to create procedure documents in the specified XML format. By following these guidelines, you can create consistent and well-structured procedure documents that can be easily understood and executed by ChatGPT or other AI systems.
  Document Structure
  The procedure document should consist of three main sections: <Command Block> <graph> and <turns>.
  
  Command Section
  The <command Block> section defines the commands available to you to use in the procedure.  Do not use any commands that are not listed in the command block. 
  
  Graph Section
  The <graph> section defines the flow of the procedure using nodes and edges.
  Each node represents a turn in the procedure and is defined using the <node> element with a unique id attribute.
  Edges represent the transitions between turns and are defined using the <edge> element with source and target attributes referring to the node IDs.
  Edge logic is defined within the <edgeLogic> element, specifying the conditions for transitioning between turns based on the return values from each turn.
  Example:
  xml
  
  Copy code
  
  
  <Command Block> 
  
  Check If Project Exists
  CommandName: Check_Project_Exists
  CommandURL: https://n8n-production-9c96.up.railway.app/webhook/afbbecd6-0f78-4aab-b799-f202f6b21ca0
  RequiredParameters:
  Parameter: name (The name of the project to check)
  ExpectedResponses:
  Success: Project ID if the project exists
  Error: "Project not found" if the project does not exist
  Create New Project on Asana (If the project does not exist)
  CommandName: Create_Project
  CommandURL: https://n8n-production-9c96.up.railway.app/webhook/295a305e-45a8-435a-a005-2fabb603968d
  RequiredParameters:
  Parameter: workspace (The workspace or organization ID where the project is to be created)
  Parameter: name (The name of the new project)
  ExpectedResponses:
  Success: New Project ID
  Error: Error message detailing why the project could not be created
  Add Task to Project
  CommandName: Add_Task
  CommandURL: https://n8n-production-9c96.up.railway.app/webhook/83924d93-34b4-4940-bbea-cb443894e319
  RequiredParameters:
  Parameter: projects (The project ID to which the task is added)
  Parameter: name (The name of the task)
  Parameter: notes (Detailed description of the task)
  ExpectedResponses:
  Success: Task ID
  Error: Error message detailing why the task could not be added
  Invite Users to Project
  CommandName: Invite_Users
  CommandURL: https://n8n-production-9c96.up.railway.app/webhook/e08db180-fda9-4f1d-8655-9fe0bcb2f1ef
  RequiredParameters:
  Parameter: project_id (The ID of the project to which users will be invited)
  Parameter: user_ids (List of user IDs to invite to the project)
  ExpectedResponses:
  Success: "Users invited successfully"
  Error: Error message detailing why the users could not be invited
  dded
  Invite Users to Project
  CommandName: Invite_Users
  CommandURL: https://api.asana.com/api/1.0/projects/{project_id}/addMembers
  RequiredParameters:
  Parameter: project_id (The ID of the project to which users will be invited)
  Parameter: user_ids (List of user IDs to invite to the project)
  ExpectedResponses:
  Success: "Users invited successfully"
  Error: Error message detailing why the users could not be invited
  
  <Command Block> 
  
  <graph>
    <node id="A">Start</node>
    <node id="B">Parse User Request Turn</node>
    ...
    <edge source="A" target="B" />
    <edge source="B" target="C">
      <edgeLogic>
        <condition>
          <source>Parse User Request Turn</source>
          <returnValue>Valid request</returnValue>
        </condition>
      </edgeLogic>
    </edge>
    ...
  </graph>
  Turns Section
  The <turns> section contains detailed descriptions for each turn in the procedure.
  Each turn is defined using the <turn> element with a unique id attribute matching the corresponding node ID in the graph.
  The <name> element specifies the name of the turn.
  The <taskStatusUpdate> element provides an update message indicating the current status or action being performed in the turn.
  The <commandList> element (optional) contains a list of commands to be executed during the turn.
  Each command is defined using the <command> element, specifying the command name, URL, and required parameters.
  The <userMessage> element specifies the message to be sent to the user during the turn.
  Example:
  xml
  
  Copy code
  <turns>
    <turn id="B">
      <name>Parse User Request Turn</name>
      <taskStatusUpdate>Parsing user request to create a Google Doc.</taskStatusUpdate>
      <commandList>
        <command>
          <commandName>Parse_User_Request</commandName>
          <commandURL>https://example.com/api/parseRequest</commandURL>
          <requiredParameters>
            <parameter>
              <key>userRequest</key>
              <value>{{$json["userRequest"]}}</value>
            </parameter>
          </requiredParameters>
        </command>
      </commandList>
      <userMessage>Analyzing your request...</userMessage>
    </turn>
    ...
  </turns>
  Creating a Procedure Document
  To create a procedure document, follow these steps:
  Define the overall flow of the procedure by identifying the necessary turns and transitions.
  Create the <graph> section:
  Add <node> elements for each turn, assigning unique id attributes.
  Add <edge> elements to define the transitions between turns.
  Specify the edge logic using <edgeLogic> and <condition> elements, defining the conditions for transitioning based on return values.
  Create the <turns> section:
  Add <turn> elements for each turn, matching the id attributes with the corresponding nodes in the graph.
  Specify the turn name using the <name> element.
  Provide a task status update using the <taskStatusUpdate> element.
  If applicable, add a <commandList> element containing <command> elements for each command to be executed during the turn.
  Specify the user message using the <userMessage> element.
  Ensure that the procedure document is well-formed XML and follows the specified structure.
  Test the procedure document by providing it to ChatGPT or the intended AI system to verify its correctness and functionality.
  Tips and Best Practices
  Use meaningful and descriptive names for nodes, turns, and commands to enhance readability and understanding.
  Keep the user messages informative and concise, providing relevant updates and instructions.
  Ensure that the edge logic conditions cover all possible return values and scenarios.
  Use consistent formatting and indentation to improve the readability of the XML document.
  Validate the XML document against the specified structure to avoid syntax errors.
  Consider using XML editing tools or IDEs with XML validation and auto-completion features to streamline the document creation process.
  Example Procedure Documents
  Example 1: Create Google Calendar Event
  xml
  
  Copy code
  <procedure>
    <graph>
      <node id="A">Start</node>
      <node id="B">Get Events Turn</node>
      <node id="C">Existing Event Turn</node>
      <node id="D">Create Event Turn</node>
      <node id="E">Event Created Turn</node>
      <node id="F">Error Turn</node>
      
      <edge source="A" target="B" />
      <edge source="B" target="C">
        <edgeLogic>
          <condition>
            <source>Get Events Turn</source>
            <returnValue>Event exists</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="B" target="D">
        <edgeLogic>
          <condition>
            <source>Get Events Turn</source>
            <returnValue>No event</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="D" target="E">
        <edgeLogic>
          <condition>
            <source>Create Event Turn</source>
            <returnValue>Event created successfully</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="D" target="F">
        <edgeLogic>
          <condition>
            <source>Create Event Turn</source>
            <returnValue>Error</returnValue>
          </condition>
        </edgeLogic>
      </edge>
    </graph>
    
    <turns>
      <turn id="B">
        <name>Get Events Turn</name>
        <taskStatusUpdate>Retrieving events for the specified date and time range.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Get_Events</commandName>
            <commandURL>https://example.com/api/getEvents</commandURL>
            <requiredParameters>
              <parameter>
                <key>date</key>
                <value>{{$json["date"]}}</value>
              </parameter>
              <parameter>
                <key>startTime</key>
                <value>{{$json["startTime"]}}</value>
              </parameter>
              <parameter>
                <key>endTime</key>
                <value>{{$json["endTime"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Checking for existing events...</userMessage>
      </turn>
      
      <turn id="C">
        <name>Existing Event Turn</name>
        <taskStatusUpdate>An existing event was found at the specified time.</taskStatusUpdate>
        <userMessage>There is already an event at that time.</userMessage>
      </turn>
      
      <turn id="D">
        <name>Create Event Turn</name>
        <taskStatusUpdate>Creating a new event with the provided details.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Create_Event</commandName>
            <commandURL>https://example.com/api/createEvent</commandURL>
            <requiredParameters>
              <parameter>
                <key>date</key>
                <value>{{$json["date"]}}</value>
              </parameter>
              <parameter>
                <key>startTime</key>
                <value>{{$json["startTime"]}}</value>
              </parameter>
              <parameter>
                <key>endTime</key>
                <value>{{$json["endTime"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Creating a new event...</userMessage>
      </turn>
      
      <turn id="E">
        <name>Event Created Turn</name>
        <taskStatusUpdate>The event was created successfully.</taskStatusUpdate>
        <userMessage>Event created successfully!</userMessage>
      </turn>
      
      <turn id="F">
        <name>Error Turn</name>
        <taskStatusUpdate>An error occurred while creating the event.</taskStatusUpdate>
        <userMessage>There was an error creating the event. Please try again.</userMessage>
      </turn>
    </turns>
  </procedure>
  Example 2: Create Google Doc with User Text
  xml
  
  Copy code
  <procedure>
    <graph>
      <node id="A">Start</node>
      <node id="B">Parse User Request Turn</node>
      <node id="C">Create Google Doc Turn</node>
      <node id="D">Add User Text Turn</node>
      <node id="E">Save Google Doc Turn</node>
      <node id="F">Success Turn</node>
      <node id="G">Error Turn</node>
      
      <edge source="A" target="B" />
      <edge source="B" target="C">
        <edgeLogic>
          <condition>
            <source>Parse User Request Turn</source>
            <returnValue>Valid request</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="B" target="G">
        <edgeLogic>
          <condition>
            <source>Parse User Request Turn</source>
            <returnValue>Invalid request</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="C" target="D">
        <edgeLogic>
          <condition>
            <source>Create Google Doc Turn</source>
            <returnValue>Document created successfully</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="C" target="G">
        <edgeLogic>
          <condition>
            <source>Create Google Doc Turn</source>
            <returnValue>Error</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="D" target="E">
        <edgeLogic>
          <condition>
            <source>Add User Text Turn</source>
            <returnValue>Text added successfully</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="D" target="G">
        <edgeLogic>
          <condition>
            <source>Add User Text Turn</source>
            <returnValue>Error</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="E" target="F">
        <edgeLogic>
          <condition>
            <source>Save Google Doc Turn</source>
            <returnValue>Document saved successfully</returnValue>
          </condition>
        </edgeLogic>
      </edge>
      <edge source="E" target="G">
        <edgeLogic>
          <condition>
            <source>Save Google Doc Turn</source>
            <returnValue>Error</returnValue>
          </condition>
        </edgeLogic>
      </edge>
    </graph>
    
    <turns>
      <turn id="B">
        <name>Parse User Request Turn</name>
        <taskStatusUpdate>Parsing user request to create a Google Doc.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Parse_User_Request</commandName>
            <commandURL>https://example.com/api/parseRequest</commandURL>
            <requiredParameters>
              <parameter>
                <key>userRequest</key>
                <value>{{$json["userRequest"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Analyzing your request...</userMessage>
      </turn>
      
      <turn id="C">
        <name>Create Google Doc Turn</name>
        <taskStatusUpdate>Creating a new Google Doc.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Create_Google_Doc</commandName>
            <commandURL>https://example.com/api/createGoogleDoc</commandURL>
            <requiredParameters>
              <parameter>
                <key>title</key>
                <value>{{$json["title"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Creating a new Google Doc...</userMessage>
      </turn>
      
      <turn id="D">
        <name>Add User Text Turn</name>
        <taskStatusUpdate>Adding user-provided text to the Google Doc.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Add_User_Text</commandName>
            <commandURL>https://example.com/api/addUserText</commandURL>
            <requiredParameters>
              <parameter>
                <key>documentId</key>
                <value>{{$json["documentId"]}}</value>
              </parameter>
              <parameter>
                <key>userText</key>
                <value>{{$json["userText"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Adding your text to the Google Doc...</userMessage>
      </turn>
      
      <turn id="E">
        <name>Save Google Doc Turn</name>
        <taskStatusUpdate>Saving the Google Doc.</taskStatusUpdate>
        <commandList>
          <command>
            <commandName>Save_Google_Doc</commandName>
            <commandURL>https://example.com/api/saveGoogleDoc</commandURL>
            <requiredParameters>
              <parameter>
                <key>documentId</key>
                <value>{{$json["documentId"]}}</value>
              </parameter>
            </requiredParameters>
          </command>
        </commandList>
        <userMessage>Saving the Google Doc...</userMessage>
      </turn>
      
      <turn id="F">
        <name>Success Turn</name>
        <taskStatusUpdate>The Google Doc was created and saved successfully.</taskStatusUpdate>
        <userMessage>Your Google Doc has been created and saved with the provided text.</userMessage>
      </turn>
      
      <turn id="G">
        <name>Error Turn</name>
        <taskStatusUpdate>An error occurred during the process.</taskStatusUpdate>
        <userMessage>There was an error while processing your request. Please try again.</userMessage>
      </turn>
    </turns>
  </procedure>
  
  
  By following this manual and adhering to the specified XML format, you can create well-structured and consistent procedure documents that can be effectively understood and executed by ChatGPT or other AI systems. The provided examples demonstrate the application of the format for different procedures, such as creating a Google Calendar event and creating a Google Doc with user text.
  
  
  
  
  DIRECTIVE: OUTPUT ONLY THE PROCEDURE AND NO EXPLANATORY TEXT OR TOKEN> 
  `);

  const { error, data: actionsInfo, isLoading } = useQuery(["actions"], async () => {
    const resp = await fetch("http://134.209.37.239:3010/getDescriptions?paginate=100&page=1&sort=asc", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    const respJson = await resp.json()
    if(respJson.success) return respJson
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate: createProcedureMutate, isLoading: createProcedureLoading, data: procedureData} = useMutation(async ({actions, procedureRequirement, procedurePrompt, name}) => {
    const resp = await fetch("http://134.209.37.239:3010/createProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({name, actions, requirement: procedureRequirement, prompt: procedurePrompt})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Procedure created")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate: saveProcedureMutate, isLoading: saveProcedureLoading} = useMutation(async ({description, procedure, name}) => {
    const resp = await fetch("http://134.209.37.239:3010/saveProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({name, description, procedure})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Procedure saved")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });

  const createProcedure = () => {
    if(!actions?.length || !procedureRequirement){
        alert("Please Fill all fields.")
    } else {
        createProcedureMutate({name: procedureName, actions, procedureRequirement, procedurePrompt})
    }
  }

  if(isLoading) return <Spinner/>
  return (
    <>
      <Formik
        initialValues={{"Name": "", "Actions": [], "Procedure Requirement": ""}}
        onSubmit={createProcedure}>
        {({ values, setFieldValue, errors, handleSubmit }) => {
          const setActionVal = (label, value) => {
              setFieldValue(label, value);
              setActions(value)
          }
          return <Form onSubmit={handleSubmit}>
            <SimpleInputField nameList={[{ name: "Name", require: "true", placeholder: t("Name"), onChange: (e) => setProcedureName(e.target.value), value: procedureName }]} />
            <MultiSelectField errors={errors} values={values} setFieldValue={setActionVal} name="Actions" require="true" data={actionsInfo.map(({name}) => ({name, id:name}))} />
            <SimpleInputField nameList={[{ name: "Procedure Requirement", require: "true", placeholder: t("Procedure Requirement"), onChange: (e) => setProcedureRequirement(e.target.value), value: procedureRequirement, type: "textarea", rows: 5, }, { name: "Procedure Creating Prompt", require: "true", placeholder: t("Procedure Creating Prompt"), onChange: (e) => setProcedurePrompt(e.target.value), value: procedurePrompt, type: "textarea", rows: 10, }]} />
            <FormBtn submitText="Create" loading={isLoading || createProcedureLoading || saveProcedureLoading} />
          </Form>
        }}
      </Formik>
      {procedureData?.data && <>
        <ReactFlowChart procedure={procedureData?.data?.procedure} description={procedureData?.data?.description} name={procedureName} />
        <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 my-2 save-back-button">
          <Btn onClick={() => {saveProcedureMutate({name: procedureName, procedure: procedureData.data.procedure, description: procedureData.data.description})}} className="btn-primary btn-lg" type="submit" title="Save" loading={isLoading || createProcedureLoading || saveProcedureLoading} />
        </div>
      </>}
    </>
  );
};

export default CreateProcedure;