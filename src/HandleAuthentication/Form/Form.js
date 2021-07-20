import React, { Component } from "react"

class Form extends Component {
 
  render() {
    return (
      <div>
      <h1> Developed By Ishak Saad Awad </h1>
     <form>
     <input type="text" className="inp" placeholder="Write the skill"/>
     <button type="submit" className="submit">submit</button>
     </form>
     
      </div>
    );
  }
}
export default Form;
  