import { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from "prop-types";

const Info = (props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const { steps } = props;
    const { name, age, number } = steps;
    setState({ name: name.value, age: age.value, number: number.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { name, age, number } = state;

  return (
    <span>
      Nombre: {name} y Edad: {age} y Numero: {number}
    </span>
  );
};

Info.propTypes = {
  steps: PropTypes.object,
};

Info.defaultProps = {
  steps: undefined,
};

const App = () => {
  const steps = [
    {
      id: "1",
      message: "Cual es tu nombre?",
      trigger: "name",
    },
    {
      id: "name",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hola {previousValue}, mucho gusto en conocerte!",
      trigger: "4",
    },
    {
      id: "4",
      message: "Que número estas pensando?",
      trigger: "number",
    },
    {
      id: "number",
      options: [
        { value: 1, label: "Número 1", trigger: "7" },
        { value: 2, label: "Número 2", trigger: "6" },
        { value: 3, label: "Número 3", trigger: "6" },
      ],
    },
    {
      id: "6",
      message: "Respuesta incorrecta, repita otra vez.",
      trigger: "4",
    },
    {
      id: "7",
      message: "Increible!",
      trigger: "8",
    },
    {
      id: "8",
      message: "Por favor escriba su edad",
      trigger: "age",
    },
    {
      id: "age",
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return "Debe ser un número";
        }
        return true;
      },
      trigger: "10",
    },
    {
      id: "10",
      message: "Muchas gracias!",
      trigger: "info",
    },
    {
      id: "info",
      component: <Info />,
      asMessage: true,
      end: true,
    },
  ];

  const handleEnd = ({ steps, values }) => {
    console.log(values);
    console.log(steps);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ChatBot
        headerTitle="ChatBot"
        handleEnd={handleEnd}
        // speechSynthesis={{ enable: true, lang: "es" }}
        steps={steps}
      />
    </div>
  );
};

export default App;
