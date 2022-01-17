import React, { useEffect } from "react";
import ChatBot from "react-simple-chatbot";

const CheersComponent = (props) => {
  const { previousStep } = props;
  const { value } = previousStep;

  const linkStyle = {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  };

  useEffect(() => {
    props.triggerNextStep({ trigger: "saludo1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span>
      Hola {value}, ¡mucho gusto en conocerte!, te voy a realizar una serie de
      preguntas de 3 cuestionarios validados clínicamente para evaluar elementos
      de tu salud emocional, y darte recomendaciones personalizadas. No
      compartiremos con nadie tus resultados individuales.
      <a
        style={linkStyle}
        href="https://es.prosperia.health/terms"
        rel="noreferrer"
        target="_blank"
      >
        Aviso de Privacidad
      </a>
    </span>
  );
};

const TextComponent = (props) => {
  const { steps, text, trigger } = props;
  const { name } = steps;

  useEffect(() => {
    props.triggerNextStep({ trigger: trigger });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span>
      {name.value}
      {text}
    </span>
  );
};

const App = () => {
  let result = {};

  const updateResult = (key, value) => {
    result = { ...result, [key]: value };
  };

  const calcGAD2 = (steps, value) => {
    // No es GAD2_1s si no GAD2_1a
    const { GAD2_1a } = steps;
    const GAD2 = GAD2_1a.value + value;
    updateResult("GAD2", GAD2);
    if (GAD2 >= 3) return "M1";
    return "M2";
  };

  const calcGAD7int1 = (steps, value) => {
    const { GAD2_1a, GAD2_2a, GAD7_3a, GAD7_4a } = steps;
    const GAD7 =
      GAD2_1a.value + GAD2_2a.value + GAD7_3a.value + GAD7_4a.value + value;
    updateResult("GAD7", GAD7);
    if (GAD7 >= 15) return "M3";
    return "GAD7_6q";
  };

  const calcGAD7int2 = (steps, value) => {
    const { GAD2_1a, GAD2_2a, GAD7_3a, GAD7_4a, GAD7_5a } = steps;
    const GAD7 =
      GAD2_1a.value +
      GAD2_2a.value +
      GAD7_3a.value +
      GAD7_4a.value +
      GAD7_5a.value +
      value;
    updateResult("GAD7", GAD7);
    if (GAD7 >= 15) return "M3";
    return "GAD7_7q";
  };

  const calcGAD7 = (steps, value) => {
    const { GAD2_1a, GAD2_2a, GAD7_3a, GAD7_4a, GAD7_5a, GAD7_6a } = steps;
    const GAD7 =
      GAD2_1a.value +
      GAD2_2a.value +
      GAD7_3a.value +
      GAD7_4a.value +
      GAD7_5a.value +
      GAD7_6a.value +
      value;
    updateResult("GAD7", GAD7);
    if (GAD7 >= 10) return "M3";
    if (GAD7 <= 9 && GAD7 >= 5) return "M4";
    return "M1";
  };

  // Condicionales de PHQ

  const calcPHQ2 = (steps, value) => {
    const { PHQ2_1a } = steps;
    const PHQ2 = PHQ2_1a.value + value;
    if (PHQ2 >= 3) return "M7";
    return "M6";
  };

  const calcPHQ9int1 = (steps, value) => {
    const { PHQ2_1a, PHQ2_2a, PHQ9_3a, PHQ9_4a, PHQ9_5a, PHQ9_6a } = steps;
    const PHQ9 =
      PHQ2_1a.value +
      PHQ2_2a.value +
      PHQ9_3a.value +
      PHQ9_4a.value +
      PHQ9_5a.value +
      PHQ9_6a.value +
      value;
    if (PHQ9 >= 20) return "M8";
    return "Phq9_8q";
  };

  const calcPHQ9int2 = (steps, value) => {
    const {
      PHQ2_1a,
      PHQ2_2a,
      PHQ9_3a,
      PHQ9_4a,
      PHQ9_5a,
      PHQ9_6a,
      PHQ9_7a,
    } = steps;
    const PHQ9 =
      PHQ2_1a.value +
      PHQ2_2a.value +
      PHQ9_3a.value +
      PHQ9_4a.value +
      PHQ9_5a.value +
      PHQ9_6a.value +
      PHQ9_7a.value +
      value;
    if (PHQ9 >= 20) return "M8";
    return "Phq9_9q";
  };

  const calcPHQ9 = (steps, value) => {
    const {
      PHQ2_1a,
      PHQ2_2a,
      PHQ9_3a,
      PHQ9_4a,
      PHQ9_5a,
      PHQ9_6a,
      PHQ9_7a,
      PHQ9_8a,
    } = steps;
    const PHQ9 =
      PHQ2_1a.value +
      PHQ2_2a.value +
      PHQ9_3a.value +
      PHQ9_4a.value +
      PHQ9_5a.value +
      PHQ9_6a.value +
      PHQ9_7a.value +
      PHQ9_8a +
      value;
    /// Elias --> PH9 not GAD7
    if (PHQ9 >= 15) return "M8";
    if (PHQ9 <= 14 && PHQ9 >= 5) return "M9";
    return "M6";
  };

  // Condicionales de MBIGS

  const calcMBIGS_A = (steps, value) => {
    const { MBIGS_A1a, MBIGS_A2a, MBIGS_A3a, MBIGS_A4a } = steps;
    const MBIGS_A =
      (MBIGS_A1a.value +
        MBIGS_A2a.value +
        MBIGS_A3a.value +
        MBIGS_A4a -
        value +
        value) /
      5;
    if (MBIGS_A >= 15) return "M11";
    return "MBIGS_E2q";
  };

  const calcMBIGS_C = (steps, value) => {
    const { MBIGS_C1a, MBIGS_C2a, MBIGS_C3a } = steps;
    const MBIGS_C =
      (MBIGS_C1a.value + MBIGS_C2a.value + MBIGS_C3a.value + value) / 4;
    if (MBIGS_C >= 10) return "M12";
    return "MBIGS_E6q";
  };

  const calcMBIGS_E = (steps, value) => {
    const { MBIGS_E1a, MBIGS_E2a, MBIGS_E3a, MBIGS_E4a, MBIGS_E5a } = steps;
    const MBIGS_E =
      (MBIGS_E1a.value +
        MBIGS_E2a.value +
        MBIGS_E3a.value +
        MBIGS_E4a.value +
        MBIGS_E5a.value +
        value) /
      6;
    if (MBIGS_E <= 22) return "M13";
    return "M14";
  };

  const steps = [
    {
      id: "1",
      message: "Cual es tu nombre?",
      trigger: "name",
    },
    {
      id: "name",
      user: true,
      trigger: "saludo",
    },
    {
      id: "saludo",
      component: <CheersComponent />,
      asMessage: true,
    },
    {
      id: "saludo1",
      options: [
        { value: 0, label: "De acuerdo, ¡empecemos!", trigger: "GAD2_1q" },
      ],
    },
    // Cuestionario GAD2
    {
      id: "GAD2_1q",
      message:
        "Durante las últimas 2 semanas, ¿con qué frecuencia te sentiste nervioso(a), intranquilo(a), o con los nervios de punta?",
      trigger: "GAD2_1a",
    },
    {
      id: "GAD2_1a",
      options: [
        { value: 0, label: "Nunca", trigger: "GAD2_2q" },
        { value: 1, label: "Varios días", trigger: "GAD2_2q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "GAD2_2q" },
        { value: 3, label: "Casi todos los días", trigger: "GAD2_2q" },
      ],
    },
    {
      id: "GAD2_2q",
      message:
        "¿Con qué frecuencia sentiste que no podías dejar de preocuparte o que no podías controlar la preocupación?",
      trigger: "GAD2_2a",
    },
    // if (GAD2 >= 3) M1 || M2;
    {
      id: "GAD2_2a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcGAD2(steps, 0),
        },
        {
          value: 1,
          label: "Varios días",
          trigger: ({ steps }) => calcGAD2(steps, 1),
        },
        {
          value: 2,
          label: "Más de la mitad de los días",
          trigger: ({ steps }) => calcGAD2(steps, 2),
        },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcGAD2(steps, 3),
        },
      ],
    },
    {
      id: "M1",
      message:
        "Tus respuestas a la preguntas anteriores me indican que no has tenido síntomas característicos de ansiedad. Si en algún momento sientes que esto cambia, puedes recurrir al ejercicio, meditación, o en casos más serios acudir a psicoterapia.",
      trigger: "M5",
    },
    {
      id: "M2",
      message:
        "Tus respuestas a la preguntas anteriores me indican que podrías estar presentando síntomas de ansiedad generalizada. ¿Puedo realizarte 5 preguntas adicionales para darte una evaluación más asertada al respecto?",
      trigger: "M2_a",
    },
    {
      id: "M2_a",
      options: [
        {
          value: 0,
          label: "No, pasemos a la siguiente sección.",
          trigger: "PHQ2_1q",
        },
        {
          value: 1,
          label: "Sí, quiero una evaluación más precisa.",
          trigger: "GAD7_3q",
        },
      ],
    },
    // Cuestionario GAD7
    {
      id: "GAD7_3q",
      message:
        "Considerando el mismo periodo de 2 semanas, ¿con qué frecuencia sentiste que te preocupabas demasiado por diferentes cosas?",
      trigger: "GAD7_3a",
    },
    {
      id: "GAD7_3a",
      options: [
        { value: 0, label: "Nunca", trigger: "GAD7_4q" },
        { value: 1, label: "Varios días", trigger: "GAD7_4q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "GAD7_4q" },
        { value: 3, label: "Casi todos los días", trigger: "GAD7_4q" },
      ],
    },
    {
      id: "GAD7_4q",
      message: "¿Con qué frecuencia sentiste que era difícil relajarse?",
      trigger: "GAD7_4a",
    },
    {
      id: "GAD7_4a",
      options: [
        { value: 0, label: "Nunca", trigger: "GAD7_5q" },
        { value: 1, label: "Varios días", trigger: "GAD7_5q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "GAD7_5q" },
        { value: 3, label: "Casi todos los días", trigger: "GAD7_5q" },
      ],
    },
    {
      id: "GAD7_5q",
      message:
        "¿Con qué frecuencia estuviste tan inquieto(a) que te era difícil permanecer sentado(a) tranquilamente?",
      trigger: "GAD7_5a",
    },
    // GAD7 >= 15 M3 || GAD7_6q
    {
      id: "GAD7_5a",
      options: [
        { value: 0, label: "Nunca", trigger: "GAD7_6q" },
        { value: 1, label: "Varios días", trigger: "GAD7_6q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "GAD7_6q" },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcGAD7int1(steps, 3),
        },
      ],
    },
    {
      id: "GAD7_6q",
      message:
        "¿Con qué frecuencia sentiste que te molestabas o irritabas con facilidad?",
      trigger: "GAD7_6a",
    },
    {
      id: "GAD7_6a",
      options: [
        { value: 0, label: "Nunca", trigger: "GAD7_7q" },
        { value: 1, label: "Varios días", trigger: "GAD7_7q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "GAD7_7q" },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcGAD7int2(steps, 3),
        },
      ],
    },
    {
      id: "GAD7_7q",
      message:
        "¿Con qué frecuencia sentiste miedo o como si algo terrible pudiera pasar?",
      trigger: "GAD7_7a",
    },
    {
      id: "GAD7_7a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcGAD7(steps, 0),
        },
        {
          value: 1,
          label: "Varios días",
          trigger: ({ steps }) => calcGAD7(steps, 1),
        },
        {
          value: 2,
          label: "Más de la mitad de los días",
          trigger: ({ steps }) => calcGAD7(steps, 2),
        },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcGAD7(steps, 3),
        },
      ],
    },
    {
      id: "M3",
      component: (
        <TextComponent
          text={
            ", presentas síntomas de ansiedad moderada/severa que puede ser tratada con psicoterapia. El tipo de terapia más recomendada para esta afección es la terapia cognitiva conductual."
          }
          trigger={"M5"}
        />
      ),
      asMessage: true,
    },
    {
      id: "M4",
      component: (
        <TextComponent
          text={
            ", presentas síntomas de ansiedad leve que pueden disminuir con autocuidados como ejercicio y meditación. Si sientes que los síntomas incrementa, considera la psicoterapia."
          }
          trigger={"M5"}
        />
      ),
      asMessage: true,
    },
    {
      id: "M5",
      options: [
        {
          value: 0,
          label: "¡Entendido! Iniciemos la siguiente sección",
          trigger: "PHQ2_1q",
        },
      ],
    },
    // Cuestionario PHQ2
    {
      id: "PHQ2_1q",
      message:
        "Durante las últimas 2 semanas, ¿qué tan seguido has sentido poco interés o placer en hacer cosas?",
      trigger: "GAD2_1a",
    },
    {
      id: "PHQ2_1a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ2_2q" },
        { value: 1, label: "Varios días", trigger: "PHQ2_2q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ2_2q" },
        { value: 3, label: "Casi todos los días", trigger: "PHQ2_2q" },
      ],
    },
    {
      id: "PHQ2_2q",
      message:
        "¿Que tan seguido te has sentido decaído(a), deprimido(a) o sin esperanzas? ",
      trigger: "PHQ2_2a",
    },
    {
      id: "PHQ2_2a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcPHQ2(steps, 0),
        },
        {
          value: 1,
          label: "Varios días",
          trigger: ({ steps }) => calcPHQ2(steps, 1),
        },
        {
          value: 2,
          label: "Más de la mitad de los días",
          trigger: ({ steps }) => calcPHQ2(steps, 2),
        },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcPHQ2(steps, 3),
        },
      ],
    },
    {
      id: "M6",
      message:
        "¡Magnífico!, tú evaluación sugiere que no has tenido síntomas de depresión. Aunque es normal sentir tristeza a veces, esto no debe interferir con nuestra vida diaria. En caso de hacerlo, debemos buscar apoyo.",
      trigger: "M10",
    },
    {
      id: "M7",
      message:
        "Tus respuestas sugieren que podrías estar presentando síntomas de depresión. ¿Quieres responder unas preguntas adicionales para darte una evaluación más asertada?",
      trigger: "M7_a",
    },
    {
      id: "M7_a",
      options: [
        {
          value: 0,
          label: "No, pasemos a la última sección.",
          trigger: "M10a",
        },
        {
          value: 1,
          label: "Sí, quiero una evaluación más precisa.",
          trigger: "PHQ9_3q",
        },
      ],
    },
    // Cuestionario PHQ9
    {
      id: "PHQ9_3q",
      message:
        "En el mismo periodo de 2 semanas, ¿con qué frecuencia has tenido dificultad para quedarte o permanecer dormido(a), o has dormido demasiado?",
      trigger: "PHQ9_3a",
    },
    {
      id: "PHQ9_3a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_4q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_4q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_4q" },
        { value: 3, label: "Casi todos los días", trigger: "PHQ9_4q" },
      ],
    },
    {
      id: "PHQ9_4q",
      message: "¿Te has sentido cansado(a) o con poca energía?",
      trigger: "PHQ9_4a",
    },
    {
      id: "PHQ9_4a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_5q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_5q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_5q" },
        { value: 3, label: "Casi todos los días", trigger: "PHQ9_5q" },
      ],
    },
    {
      id: "PHQ9_5q",
      message: "¿Te has sentido sin apetito o has comido en exceso?",
      trigger: "GAD7_5a",
    },
    {
      id: "PHQ9_5a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_6q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_6q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_6q" },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcPHQ9int1(steps, 3),
        },
      ],
    },
    {
      id: "PHQ9_6q",
      message:
        "¿Te ha sentido mal contigo mismo(a), que eres un fracaso o que has quedado mal contigo mismo(a) o con tu familia?",
      trigger: "PHQ9_6a",
    },
    {
      id: "PHQ9_6a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_7q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_7q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_7q" },
        { value: 3, label: "Casi todos los días", trigger: "PHQ9_7q" },
      ],
    },
    {
      id: "PHQ9_7q",
      message:
        "¿Has tenido dificultad para concentrarte en ciertas actividades, tales como leer o ver la televisión?",
      trigger: "PHQ9_7a",
    },
    {
      id: "PHQ9_7a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_8q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_8q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_8q" },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcPHQ9int1(steps, 3),
        },
      ],
    },
    {
      id: "PHQ9_8q",
      message:
        "¿Has tenido dificultad para concentrarte en ciertas actividades, tales como leer o ver la televisión?",
      trigger: "PHQ9_8a",
    },
    {
      id: "PHQ9_8a",
      options: [
        { value: 0, label: "Nunca", trigger: "PHQ9_9q" },
        { value: 1, label: "Varios días", trigger: "PHQ9_9q" },
        { value: 2, label: "Más de la mitad de los días", trigger: "PHQ9_9q" },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcPHQ9int2(steps, 3),
        },
      ],
    },
    {
      id: "PHQ9_9q",
      message:
        "¿Has tenido dificultad para concentrarte en ciertas actividades, tales como leer o ver la televisión?",
      trigger: "PHQ9_7a",
    },
    {
      id: "PHQ9_9a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcPHQ9(steps, 0),
        },
        {
          value: 1,
          label: "Varios días",
          trigger: ({ steps }) => calcPHQ9(steps, 1),
        },
        {
          value: 2,
          label: "Más de la mitad de los días",
          trigger: ({ steps }) => calcPHQ9(steps, 2),
        },
        {
          value: 3,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcPHQ9(steps, 3),
        },
      ],
    },
    {
      id: "M8",
      message:
        "Tus respuestas indican que tienes síntomas de depresión moderadamente graves. Te sugiero acudir con un profesional de la salud ya que podría tener un origen fisológico.",
      trigger: "M10",
    },
    {
      id: "M9",
      message:
        "Tus respuestas indican que tienes síntomas de depresión leve o moderada. Crear una rutina diaria que incluya actividad física y 7-8 horas de sueño, puede ayudar. Idealmente, consulta a un profesional de la salud.",
      trigger: "M10",
    },
    {
      id: "M10",
      options: [{ value: 0, label: "¡Entendido!", trigger: "M10a" }],
    },
    {
      id: "M10a",
      message:
        "Ya sólo nos falta una sección. Te sugiero darle un momento de descanso a tus ojos, parpadeando y enfocando un objeto lejano durante 20 segundos.",
      trigger: "M10b",
      //end: true,
    },
    {
      id: "M10b",
      options: [
        {
          value: 0,
          label: "¿Porqué es importante descansar los ojos?",
          trigger: "M10c",
        },
        {
          value: 1,
          label: "¡Listo! Pasemos a la última sección",
          trigger: "MBIGS_1q",
        },
      ],
    },
    //Falta MBIGS_1q
    {
      id: "MBIGS_1q",
      message: "Falta MBIGS_1q",
      end: true,
    },
    ///
    {
      id: "M10c",
      message:
        "Normalmente, los humanos parpadean unas 15 veces por minuto. Sin embargo, sólo parpadean entre 5 y 7 veces por minuto cuando usan la computadora u otra pantalla digital. ¡Esto afecta la salud de tus ojos!",
      trigger: "M10b",
    },
    {
      id: "M10d",
      options: [
        {
          value: 0,
          label: "¡Interesante! Pasemos a la última sección",
          trigger: "M10e",
        },
      ],
    },
    // Cuestionario MBIGS
    {
      id: "M10e",
      message:
        "Las siguientes preguntas están enfocadas en la evaluación de tu contexto laboral. Su análisis me permitirá dar recomendaciones a un alto nivel para mejorar las condciones de trabajo.",
      trigger: "MBIGS_A1q",
    },
    {
      id: "MBIGS_A1q",
      message:
        "A lo largo del último año en su trabajo, ¿con qué frecuencia te has sentido identificado(a) con alguna de las siguientes afirmaciones? “Estoy emocionalmente agotado por mi trabajo”",
      trigger: "MBIGS_A1a",
    },
    {
      id: "MBIGS_A1a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_A2q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_A2q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_A2q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_A2q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_A2q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_A2q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_A2q" },
      ],
    },
    {
      id: "MBIGS_A2q",
      message: "“Estoy *consumido* al final de un día de trabajo”",
      trigger: "MBIGS_A2a",
    },
    {
      id: "MBIGS_A2a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_A3q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_A3q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_A3q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_A3q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_A3q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_A3q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_A3q" },
      ],
    },
    {
      id: "MBIGS_A3q",
      message:
        "“Estoy cansado cuando me levanto por la mañana y tengo que afrontar otro día en mi puesto de trabajo”",
      trigger: "MBIGS_A3a",
    },
    {
      id: "MBIGS_A3a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_A4q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_A4q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_A4q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_A4q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_A4q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_A4q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_A4q" },
      ],
    },
    {
      id: "MBIGS_A4q",
      message: "“Trabajar todo el día es una tensión para mí”",
      trigger: "MBIGS_A4a",
    },
    {
      id: "MBIGS_A4a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_E1q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_E1q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_E1q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_E1q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_E1q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_E1q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_E1q" },
      ],
    },
    {
      id: "MBIGS_E1q",
      message:
        "“Puedo resolver de manera eficaz los problemas que surgen en mi trabajo”",
      trigger: "MBIGS_E1a",
    },
    {
      id: "MBIGS_E1a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_A5q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_A5q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_A5q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_A5q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_A5q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_A5q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_A5q" },
      ],
    },
    {
      id: "MBIGS_A5q",
      message: "“Estoy *quemado* por el trabajo”",
      trigger: "MBIGS_A5a",
    },
    {
      id: "MBIGS_A5a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcMBIGS_A(steps, 0),
        },
        {
          value: 1,
          label: "Muy raras veces",
          trigger: ({ steps }) => calcMBIGS_A(steps, 1),
        },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_A(steps, 2),
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_A(steps, 3),
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: ({ steps }) => calcMBIGS_A(steps, 4),
        },
        {
          value: 5,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcMBIGS_A(steps, 5),
        },
        {
          value: 6,
          label: "Todos los días",
          trigger: ({ steps }) => calcMBIGS_A(steps, 6),
        },
      ],
    },
    {
      id: "MBIGS_E2q",
      message:
        "A lo largo del último año en su trabajo, ¿con qué frecuencia se ha sentido identificado con las siguientes afirmaciones? “Contribuyo efectivamente a lo que hace mi organización”",
      trigger: "MBIGS_E2a",
    },
    {
      id: "MBIGS_E2a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_C1q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_C1q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_C1q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_C1q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_C1q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_C1q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_C1q" },
      ],
    },
    {
      id: "MBIGS_C1q",
      message:
        "“He perdido interés por mi trabajo desde que empecé en este puesto”",
      trigger: "MBIGS_C1a",
    },
    {
      id: "MBIGS_C1a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_C2q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_C2q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_C2q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_C2q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_C2q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_C2q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_C2q" },
      ],
    },
    {
      id: "MBIGS_C2q",
      message: "“He perdido entusiasmo por mi trabajo”",
      trigger: "MBIGS_C2a",
    },
    {
      id: "MBIGS_C2a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_E3q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_E3q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_E3q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_E3q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_E3q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_E3q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_E3q" },
      ],
    },
    {
      id: "MBIGS_E3q",
      message: "“En mi opinión soy bueno en mi puesto”",
      trigger: "MBIGS_E3a",
    },
    {
      id: "MBIGS_E3a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_E4q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_E4q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_E4q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_E4q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_E4q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_E4q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_E4q" },
      ],
    },
    {
      id: "MBIGS_E4q",
      message:
        "A lo largo del último año en su trabajo, ¿con qué frecuencia se ha sentido identificado con alguna de las siguientes afirmaciones? “Estoy emocionalmente agotado por mi trabajo",
      trigger: "MBIGS_E4a",
    },
    {
      id: "MBIGS_E4a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_E5q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_E5q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_E5q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_E5q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_E5q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_E5q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_E5q" },
      ],
    },
    {
      id: "MBIGS_E5q",
      message: "“He conseguido muchas cosas valiosas en este puesto”",
      trigger: "MBIGS_E5a",
    },
    {
      id: "MBIGS_E5a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_C3q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_C3q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_C3q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_C3q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_C3q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_C3q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_C3q" },
      ],
    },
    {
      id: "MBIGS_C3q",
      message: "“Me he vuelto más cínico respecto a la utilidad de mi trabajo”",
      trigger: "MBIGS_C3a",
    },
    {
      id: "MBIGS_C3a",
      options: [
        { value: 0, label: "Nunca", trigger: "MBIGS_C4q" },
        { value: 1, label: "Muy raras veces", trigger: "MBIGS_C4q" },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: "MBIGS_C4q",
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: "MBIGS_C4q",
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: "MBIGS_C4q",
        },
        { value: 5, label: "Casi todos los días", trigger: "MBIGS_C4q" },
        { value: 6, label: "Todos los días", trigger: "MBIGS_C4q" },
      ],
    },
    {
      id: "MBIGS_C4q",
      message: "“Dudo de la trascendencia y valor de mi trabajo”",
      trigger: "MBIGS_C4a",
    },
    {
      id: "MBIGS_C4a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcMBIGS_C(steps, 0),
        },
        {
          value: 1,
          label: "Muy raras veces",
          trigger: ({ steps }) => calcMBIGS_C(steps, 1),
        },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_C(steps, 2),
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_C(steps, 3),
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: ({ steps }) => calcMBIGS_C(steps, 4),
        },
        {
          value: 5,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcMBIGS_C(steps, 5),
        },
        {
          value: 6,
          label: "Todos los días",
          trigger: ({ steps }) => calcMBIGS_C(steps, 6),
        },
      ],
    },
    {
      id: "MBIGS_E6q",
      message:
        "Por último, A lo largo del último año en su trabajo, ¿con qué frecuencia se ha sentido identificado con la siguiente afirmación?: “En mi trabajo, tengo la seguridad de que soy eficaz en la finalización de las cosas”",
      trigger: "MBIGS_E6a",
    },
    {
      id: "MBIGS_E6a",
      options: [
        {
          value: 0,
          label: "Nunca",
          trigger: ({ steps }) => calcMBIGS_E(steps, 0),
        },
        {
          value: 1,
          label: "Muy raras veces",
          trigger: ({ steps }) => calcMBIGS_E(steps, 1),
        },
        {
          value: 2,
          label: "En algunas ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_E(steps, 2),
        },
        {
          value: 3,
          label: "En bastantes ocasiones en el año",
          trigger: ({ steps }) => calcMBIGS_E(steps, 3),
        },
        {
          value: 4,
          label: "Frecuentemente a lo largo del año",
          trigger: ({ steps }) => calcMBIGS_E(steps, 4),
        },
        {
          value: 5,
          label: "Casi todos los días",
          trigger: ({ steps }) => calcMBIGS_E(steps, 5),
        },
        {
          value: 6,
          label: "Todos los días",
          trigger: ({ steps }) => calcMBIGS_E(steps, 6),
        },
      ],
    },
    {
      id: "M11",
      message:
        "Parece ser que sientes agotamiento laboral. Esto puede deberse a la carga de trabajo, la monotonía de las tareas o, el desequilibrio entre la vida personal y el trabajo.",
      trigger: "M11a",
    },
    {
      id: "M11a",
      options: [{ value: 0, label: "Continuar", trigger: "MBIGS_E2q" }],
    },
    {
      id: "M12",
      message:
        "Parece ser que has perdido la emoción por tu trabajo en el último año. Esto puede mejorar con el establecimeinto de nuevas metas y proyectos en conjunto con tu equipo de trabajo.",
      trigger: "M12a",
    },
    {
      id: "M12a",
      options: [{ value: 0, label: "Continuar", trigger: "MBIGS_E6q" }],
    },
    {
      id: "M13",
      message:
        "Tu percepción de desempeño y expectativas en el trabajo está muy baja. Esto no necesariamente refleja tu rendimiento, sin embargo, puede afectarlo si no lo abordas con tu supevisor o jefe.",
      trigger: "M13a",
    },
    {
      id: "M13a",
      options: [{ value: 0, label: "Finalizar", trigger: "8" }],
    },
    {
      id: "8",
      message: "Muchas gracias!",
      end: true,
    },
  ];

  const handleEnd = ({ renderedSteps, steps, values }) => {};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ChatBot headerTitle="ChatBot" handleEnd={handleEnd} steps={steps} />
    </div>
  );
};

export default App;
