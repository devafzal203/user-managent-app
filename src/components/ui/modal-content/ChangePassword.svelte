<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "../Button.svelte";
  import Input from "../Input.svelte";
  import type { FormError } from "$lib/types";
  import { toast } from "$stores/toast";
  import { api } from "$lib/axios";

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  export let showPasswordModal: boolean;
  export let isLoading: boolean;
  export let refetchUser: () => Promise<void>;

  let password: string = "";
  let showPassword = false;
  let confirmPassword: string = "";
  let showConfirmPassword = false;
  let errors: FormError = {};

  const validatePassword = () => {
    if (!password) {
      errors = { ...errors, password: "Password is required" };
      return false;
    }
    if (!passwordRegex.test(password)) {
      errors = {
        ...errors,
        password:
          "Password must be at least 8 characters with letters and numbers",
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
    if (validatePassword() && validateConfirmPassword()) {
      return true;
    }
    toast.addToast({
      title: "Oops! Something is missing",
      description: "Please fix the errors before saving",
      type: "warning",
    });
    return false;
  };

  async function handleSave() {
    if (validateForm()) {
      isLoading = true;
      try {
        const response = await api.patch("/user/password", {
          newPassword: password,
        });

        if (response.status === 200) {
          toast.addToast({
            title: "Success",
            description: "Password changed successfully",
            type: "success",
          });
          await refetchUser();
          showPasswordModal = false;
        }
      } catch (error: any) {
        toast.addToast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to update password",
          type: "error",
        });
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<section class="p-2">
  <div class="flex items-center justify-start gap-x-2">
    <div class="bg-primary/20 rounded-full p-2.5">
      <Icon icon="tabler:password-user" width={25} height={25} />
    </div>
    <div>
      <p class="text-lg font-rubik">Change Password</p>
      <p class="text-sm text-gray-500 font-rubik">
        Change your password to something more secure.
      </p>
    </div>
  </div>

  <div class="space-y-2 my-8">
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
  </div>

  <div class="flex items-center justify-end gap-x-5">
    <Button
      on:click={() => (showPasswordModal = false)}
      variant="filled"
      className="w-1/4 border border-primary">Cancel</Button
    >
    <Button
      on:click={handleSave}
      className="w-1/4"
      loading={isLoading}
      disabled={!password || !confirmPassword}
    >
      {isLoading ? "Saving" : "Save"}
    </Button>
  </div>
</section>
