import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { get, post } from "../../apis/boardFormApi";

function BoardForm(props) {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    author: "",
  });
  useEffect(() => {
    if (props.id !== 0) {
      updateFields(props.id);
    }
  }, [props.id]);
  
  const updateFields = async (id) => {
    let result = await get(id, props.type);
    setFormValues(result);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addPost = async () => {
    var status =
      props.id === 0
        ? await post(null, "POST", formValues, props.type)
        : await post(props.id, "PUT", formValues, props.type);

    if (status) {
      setFormValues({});
      props.modalClose();
    } else {
      alert("notice didn't added");
    }
  };
  return (
    <Modal animation="true" show={props.show} onHide={props.modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notice Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mt-2" controlId="title">
            <Form.Label className="mb-0">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              defaultValue={formValues.title}
              onChange={handleChange}
              placeholder="Enter the title"
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="content">
            <Form.Label className="mb-0">Content/Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              defaultValue={formValues.content}
              onChange={handleChange}
              placeholder="Enter your content"
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="author">
            <Form.Label className="mb-0">Name</Form.Label>
            <Form.Control
              type="text"
              name="author"
              defaultValue={formValues.author}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            setFormValues({});
            props.modalClose();
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={addPost}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BoardForm;
