import { useRef, forwardRef, useState, useImperativeHandle } from 'react';
import './App.css'

function App() {

  const inputRef = useRef();
    const checkboxRef = useRef();

    const handleButtonClick = () => {
        console.log(inputRef.current.getValue());
        console.log(checkboxRef.current.getChecked());
    }

    return (
        <div>
            <InputComponent ref={inputRef} />
            <CheckBoxComponent ref={checkboxRef} />
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
