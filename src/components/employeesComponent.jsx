import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Employees extends Component {

  baseURL = 'https://jsonplaceholder.typicode.com/todos/';

  state = {
    emps: [],
    tempEmp: {},
    show: false
  };


  handleClose = () => (this.setState({show:false}));
  handleShow = (emp, i) => {
    const tempEmp = {...emp}
    tempEmp._index = i;
    this.setState({show:true, tempEmp});
  };

  constructor(props) {
    super(props);
  }

  render() {

    // if(!this.state.emps) return;

    return (
      <div className="conatainer">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
        {this.state.emps?.map((emp, i) => (
            <tr onClick={() => this.handleShow(emp, i)}>
              <td>{emp.title}</td>
            </tr>
          ))}

        </tbody>
      </table>


      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name="title"
            value={this.state.tempEmp.title}
            onChange={this.changeHandle}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SaveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }

  async componentDidMount () {
    const {data: emps} = await axios.get(this.baseURL);
    console.log(emps);
    this.setState({emps});
  }

  changeHandle = ({currentTarget: input}) => {
    console.log('handle changes');
    const {tempEmp} = this.state;
    tempEmp[input.name] = input.value;
    this.setState({tempEmp});
  };

  SaveData = async () => {
    const {tempEmp: emp} = this.state;
    const result = await axios.put(this.baseURL + emp.id, emp);
    const emps = [...this.state.emps];
    const index = emp._index;
    emps[index] = {...emp};
    this.setState({emps, show: false});
  }

}

export default Employees;
