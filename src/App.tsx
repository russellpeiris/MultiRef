import { useRef, forwardRef, useState, useImperativeHandle } from 'react';
import './App.css'

function App() {
  // create a ref register 
  const componentRefs = useRef({
    input: null,
    checkbox: null
  });

  const registerRef = (name, ref) => {
    componentRefs.current[name] = ref;
  }

  const handleButtonClick = () => {
    console.log(componentRefs.current.input.getValue());
    console.log(componentRefs.current.checkbox.getChecked());
  }
    return (
        <div>
            <InputComponent ref={
              (ref) => registerRef('input', ref)
            } />
            <CheckBoxComponent ref={
              (ref) => registerRef('checkbox', ref)
            } />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );
}

export default App

const InputComponent = forwardRef((props, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () =>({
      getValue: () => {
          return value;
      }
  }), [value]
  )

return (
  <input
    type="text"
    value={props.value}
    onChange={(e) => setValue(e.target.value)}
  />
);
});


const CheckBoxComponent = forwardRef((props, ref) => {
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () =>({
      getChecked: () => {
          return checked;
      }
  }), [checked]
 )

return (
  <input
    type="checkbox"
    checked={props.checked}
    onChange={(e) => setChecked(e.target.checked)}
  />
);
});
