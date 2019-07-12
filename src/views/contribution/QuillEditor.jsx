import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class QuillEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    // this.setState({ editorHtml: html });
    this.props.dataFunc(html);
  }


  render() {
    return (
      <div>
          <ReactQuill
            className="selection-area"
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.props.setData}
            modules={QuillEditor.modules}
            formats={QuillEditor.formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
          />       

        {/* <div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={(e) =>
            this.handleThemeChange(e.target.value)}>
            <option value="bubble">Bubble</option>
            <option value="snow">Snow</option>
          </select>
        </div> */}
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }, { 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
  'list', 'bullet', 'indent', 'align',
  'link', 'image', 'video'
]


export default QuillEditor;
