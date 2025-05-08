import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to Deep-Chat 💬",
        1000,
        "Built With Multiple AI Models 🤖",
        2000,
        "Including ChatGPT, Deepseek, and Gemini",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "50px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;