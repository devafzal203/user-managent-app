<script lang="ts">
  import { goto } from "$app/navigation";
  import SparkLogo from "$components/icons/SparkLogo.svelte";
  import SparkText from "$components/icons/SparkText.svelte";
  import SocialAuth from "$components/ui/SocialAuth.svelte";
  import Button from "$components/ui/Button.svelte";
  import Checkbox from "$components/ui/Checkbox.svelte";
  import Input from "$components/ui/Input.svelte";
  import LineSeprator from "$components/ui/LineSeprator.svelte";
  import { colors } from "$lib/constants/colors";
  import { signup } from "$lib/request";
  import type { FormError } from "$lib/types";
  import { toast } from "$stores/toast";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let showPassword = false;
  let showConfirmPassword = false;
  let rememberMe = false;
  let errors: FormError = {};
  let submitting = false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const validateName = () => {
    if (!name) {
      errors = { ...errors, name: "Name is required" };
      return false;
    }
    errors = { ...errors, name: "" };
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      errors = { ...errors, email: "Email is required" };
      return false;
    }
    if (!emailRegex.test(email)) {
      errors = { ...errors, email: "Enter a valid email" };
      return false;
    }
    errors = { ...errors, email: "" };
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      errors = { ...errors, password: "Password is required" };
      return false;
    }
    if (!passwordRegex.test(password)) {
      errors = {
        ...errors,
        password: "Provide a strong password (e.g. John@123)",
      };
      return false;
    }
    errors = { ...errors, password: "" };
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      errors = { ...errors, confirmPassword: "Enter your password again" };
      return false;
    }
    if (password !== confirmPassword) {
      errors = { ...errors, confirmPassword: "Passwords do not match" };
      return false;
    }
    errors = { ...errors, confirmPassword: "" };
    return true;
  };

  const toggleShowPassword = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      showPassword = !showPassword;
    } else {
      showConfirmPassword = !showConfirmPassword;
    }
  };

  const validateForm = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      return true;
    } else {
      toast.addToast({
        title: "Regitration failed",
        description: "Please check all fields!",
        type: "error",
      });
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        submitting = true;
        const payload = { name, email, password };
        await signup(payload)
          .then(() =>
            toast.addToast({
              title: "Registration successful",
              description: "Please login to continue",
              type: "success",
            })
          )
          .then(() => goto("/"));
      } catch (error) {
        toast.addToast({
          title: "Registration failed!",
          description: (error as any)?.response?.data?.error,
          type: "error",
        });
      } finally {
        submitting = false;
      }
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };
</script>

<main class="h-screen flex items-center">
  <section
    class="p-5 ml-2 h-[98%] w-[35%] rounded-lg bg-primary flex flex-col items-center justify-center md:hidden sm:hidden"
  >
    <div class="flex justify-center gap-x-2 mr-4">
      <SparkLogo
        colorIn={colors.main}
        colorOut={colors.default}
        width={55}
        height={55}
      />
      <SparkText width={180} color={colors.default} />
    </div>
    <p class="px-10 text-xl text-white text-center font-rubik">
      All the digital tools you'll ever need, together in one place.
    </p>
  </section>

  <section
    class="w-[65%] h-full flex items-center justify-center md:w-full sm:w-full"
  >
    <div class="p-5 space-y-7">
      <div class="md:flex sm:flex items-center -mt-7 hidden">
        <p class="mb-3">
          <SparkLogo
            colorIn={colors.default}
            colorOut={colors.main}
            height={40}
            width={40}
          />
        </p>
        <SparkText color={colors.sparkText} height={100} width={100} />
      </div>
      <div class="text-left">
        <h1 class="text-3xl text-secondary font-rubik font-semibold">
          Get started now.
        </h1>
        <p class="text-lg text-secondary font-rubik">
          Create an account and supercharge your creativity.
        </p>
      </div>
      <form on:submit|preventDefault={handleSubmit} class="space-y-3">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          bind:value={name}
          error={errors.name}
          on:blur={validateName}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          bind:value={email}
          error={errors.email}
          on:blur={validateEmail}
          required
        />
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder={showPassword ? "Password" : "*******"}
          bind:value={password}
          icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
          onIconClick={() => toggleShowPassword("password")}
          error={errors.password}
          on:blur={validatePassword}
          required
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder={showConfirmPassword ? "Confirm password" : "*******"}
          bind:value={confirmPassword}
          icon={showConfirmPassword ? "mdi:eye" : "mdi:eye-off"}
          onIconClick={() => toggleShowPassword("confirmPassword")}
          error={errors.confirmPassword}
          on:blur={validateConfirmPassword}
          required
        />
        <div class="flex justify-between pb-2">
          <Checkbox
            checked={rememberMe}
            label="Remember Me"
            name="rememberMe"
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-3"
          loading={submitting}
          disabled={submitting}>Continue</Button
        >
      </form>
      <LineSeprator text="OR" />
      <SocialAuth provider="google" on:click={handleGoogleAuth} />
      <p class="text-center font-rubik">
        Already have an account?
        <a href="/" class="underline text-primary cursor-pointer ml-1">
          Sign in
        </a>
      </p>
    </div>
  </section>
</main>
