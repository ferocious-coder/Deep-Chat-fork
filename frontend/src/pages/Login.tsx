import { Box, Button, Typography } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { RiLoginBoxLine } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signin In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed in Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signin Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"95%"} height={"95%"} display={"flex"} flex={1} mt={-2}>
      <Box padding={6} mt={6} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="brandImage.png"
          alt="BrandImage"
          style={{ width: "375px", height: "400px" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
        ml={"auto"}
        mt={12}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "40px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "350px",
              height: "275px",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={0.1}
              fontWeight={500}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<RiLoginBoxLine />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default Login;
