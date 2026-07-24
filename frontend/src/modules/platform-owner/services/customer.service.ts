import api from "@/lib/axios";
import { OnboardCustomerFormData } from "@/modules/platform-owner/components/AddCustomerModal";

/**
 * Platform Owner Customer Service
 * Handles API communication for platform customer onboarding & administration workflows.
 */
export async function createCustomer(payload: OnboardCustomerFormData) {
  const response = await api.post("/platform-owner/create-super-admin", payload);
  return response.data;
}
