import React, { useRef, forwardRef, useState, useImperativeHandle } from 'react';

interface Field {
  id: string;
  label: string;
  type: 'text' | 'checkbox';
}

interface FieldRefs {
  [key: string]: any; // Keys are field IDs, and values are refs
}

function DynamicForm({ fields }: { fields: Field[] }) {
  const fieldRefs = useRef<FieldRefs>({}); // Dynamic refs stored here

  const registerRef = (id: string, ref: any) => {
    fieldRefs.current[id] = ref;
  };

  const handleSubmit = () => {
    const values: { [key: string]: any } = {};
    fields.forEach((field) => {
      const ref = fieldRefs.current[field.id];
      if (field.type === 'text') {
        values[field.id] = ref?.getValue();
      } else if (field.type === 'checkbox') {
        values[field.id] = ref?.getChecked();
      }
    });
    console.log('Form Values:', values);
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>
          {field.type === 'text' && (
            <InputComponent ref={(ref) => registerRef(field.id, ref)} />
          )}
          {field.type === 'checkbox' && (
            <CheckBoxComponent ref={(ref) => registerRef(field.id, ref)} />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Example usage
export default function App() {
  const fields: Field[] = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'acceptTerms', label: 'Accept Terms', type: 'checkbox' },
    { id: 'email', label: 'Email', type: 'text' },
  ];

  return <DynamicForm fields={fields} />;
}

// Input Component
interface InputComponentRef {
  getValue: () => string;
}

const InputComponent = forwardRef<InputComponentRef>((props, ref) => {
  const [value, setValue] = useState<string>('');

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => value,
    }),
    [value]
  );

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

// Checkbox Component
interface CheckBoxComponentRef {
  getChecked: () => boolean;
}

const CheckBoxComponent = forwardRef<CheckBoxComponentRef>((props, ref) => {
  const [checked, setChecked] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      getChecked: () => checked,
    }),
    [checked]
  );

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
});
