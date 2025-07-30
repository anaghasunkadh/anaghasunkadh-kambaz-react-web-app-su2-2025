
import ArrayStateVariable from "./ArrayStateVariable";
import DateStateVariable from "./ateStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import ReduxExamples from "./ReduxExamples";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import TodoList from "./ReduxExamples/todos/TodoList";


export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div>
      <h2>Lab 4</h2>
      <ClickEvent />
       <PassingDataOnEvent/>
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
     < BooleanStateVariables/>
     <StringStateVariables/>
     <DateStateVariable/>
     <ObjectStateVariable/>
     <ArrayStateVariable/>
     <ParentStateComponent/>
     <ReduxExamples/>
     <TodoList />
     
     
      
      
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}