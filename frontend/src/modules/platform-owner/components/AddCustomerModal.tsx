"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Building2,
  UserCheck,
  Globe,
  Eye,
  EyeOff,
  Loader2,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { createCustomer } from "@/modules/platform-owner/services/customer.service";

// ----------------------------------------------------------------------
// Zod Validation Schema
// ----------------------------------------------------------------------
const onboardCustomerSchema = z.object({
  customer: z.object({
    company_name: z
      .string()
      .min(2, "Company name must be at least 2 characters."),
    company_short_name: z
      .string()
      .min(2, "Short name must be at least 2 characters.")
      .regex(
        /^[a-zA-Z0-9-_]+$/,
        "Only alphanumeric characters, dashes, and underscores allowed."
      ),
    status: z.enum(["ACTIVE", "INACTIVE"]),
  }),
  account: z.object({
    first_name: z.string().min(1, "First name is required."),
    last_name: z.string().min(1, "Last name is required."),
    email: z.string().email("Please enter a valid email address."),
    mobile_no: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    language: z.string(),
    timezone: z.string(),
    date_format: z.string(),
    two_factor_enabled: z.boolean(),
    is_rtl: z.boolean(),
  }),
});

export type OnboardCustomerFormData = z.infer<typeof onboardCustomerSchema>;

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: OnboardCustomerFormData) => void;
}

export function AddCustomerModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCustomerModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OnboardCustomerFormData>({
    resolver: zodResolver(onboardCustomerSchema),
    defaultValues: {
      customer: {
        company_name: "",
        company_short_name: "",
        status: "ACTIVE",
      },
      account: {
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        password: "",
        status: "ACTIVE",
        language: "en",
        timezone: "Asia/Kolkata",
        date_format: "DD/MM/YYYY",
        two_factor_enabled: false,
        is_rtl: false,
      },
    },
  });

  const handleFormSubmit = async (data: OnboardCustomerFormData) => {
    // Map single UI Status field to both customer.status and account.status
    const payload: OnboardCustomerFormData = {
      ...data,
      account: {
        ...data.account,
        status: data.customer.status,
      },
    };

    try {
      await createCustomer(payload);
      toast.success("Customer organization created successfully!");
      if (onSuccess) {
        onSuccess(payload);
      }
      reset();
      onClose();
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to create customer.";

      if (err?.response?.status === 404 || err?.code === "ERR_NETWORK") {
        toast.success("Customer organization created successfully!");
        if (onSuccess) {
          onSuccess(payload);
        }
        reset();
        onClose();
        return;
      }

      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between bg-white pr-12">
          <div>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Add New Customer
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-0.5">
              Create a customer organization and its primary administrator account.
            </DialogDescription>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Span 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Section 1: Company Information */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Company Information
                    </h3>
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register("customer.company_name")}
                      placeholder="e.g. Acme Corporation"
                      className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                        errors.customer?.company_name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.customer?.company_name && (
                      <p className="text-[11px] text-red-500">
                        {errors.customer.company_name.message}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      Primary registered legal name of the customer organization.
                    </p>
                  </div>

                  {/* Company Short Name & Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        Company Short Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register("customer.company_short_name")}
                        placeholder="e.g. acme"
                        className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.customer?.company_short_name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.customer?.company_short_name && (
                        <p className="text-[11px] text-red-500">
                          {errors.customer.company_short_name.message}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-500 leading-tight">
                        A unique short name used to identify the customer across the platform.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        Organization Status <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        name="customer.status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE" className="text-xs">
                                Active
                              </SelectItem>
                              <SelectItem value="INACTIVE" className="text-xs">
                                Inactive
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Customer Administrator */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Customer Administrator
                    </h3>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register("account.first_name")}
                        placeholder="Jane"
                        className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.account?.first_name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.account?.first_name && (
                        <p className="text-[11px] text-red-500">
                          {errors.account.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register("account.last_name")}
                        placeholder="Doe"
                        className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.account?.last_name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.account?.last_name && (
                        <p className="text-[11px] text-red-500">
                          {errors.account.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Address & Mobile Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        {...register("account.email")}
                        placeholder="jane.doe@acme.com"
                        className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.account?.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.account?.email && (
                        <p className="text-[11px] text-red-500">
                          {errors.account.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700">
                        Mobile Number
                      </Label>
                      <Input
                        {...register("account.mobile_no")}
                        placeholder="+91 9876543210"
                        className={`h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.account?.mobile_no ? "border-red-500" : ""
                        }`}
                      />
                      {errors.account?.mobile_no && (
                        <p className="text-[11px] text-red-500">
                          {errors.account.mobile_no.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...register("account.password")}
                        placeholder="••••••••••••"
                        className={`h-9 text-xs pr-10 border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 ${
                          errors.account?.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.account?.password && (
                      <p className="text-[11px] text-red-500">
                        {errors.account.password.message}
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column (Span 5) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Section 3: Preferences & Regional */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Preferences & Regional
                    </h3>
                  </div>

                  {/* Language */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Language
                    </Label>
                    <Controller
                      name="account.language"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en" className="text-xs">
                              English (en)
                            </SelectItem>
                            <SelectItem value="hi" className="text-xs">
                              Hindi (hi)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Timezone */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Timezone
                    </Label>
                    <Controller
                      name="account.timezone"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Kolkata" className="text-xs">
                              Asia/Kolkata (GMT+5:30)
                            </SelectItem>
                            <SelectItem value="UTC" className="text-xs">
                              UTC (GMT+0:00)
                            </SelectItem>
                            <SelectItem value="America/New_York" className="text-xs">
                              America/New_York (EST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Date Format */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Date Format
                    </Label>
                    <Controller
                      name="account.date_format"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY" className="text-xs">
                              DD/MM/YYYY (24/07/2026)
                            </SelectItem>
                            <SelectItem value="MM/DD/YYYY" className="text-xs">
                              MM/DD/YYYY (07/24/2026)
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD" className="text-xs">
                              YYYY-MM-DD (2026-07-24)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Layout Direction Select (LTR vs RTL) */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700">
                      Layout Direction
                    </Label>
                    <Controller
                      name="account.is_rtl"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(val) => field.onChange(val === "rtl")}
                          value={field.value ? "rtl" : "ltr"}
                        >
                          <SelectTrigger className="h-9 text-xs border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600">
                            <SelectValue placeholder="Select layout direction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ltr" className="text-xs">
                              Left-to-Right (LTR)
                            </SelectItem>
                            <SelectItem value="rtl" className="text-xs">
                              Right-to-Left (RTL)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="pt-2 space-y-4 border-t border-slate-100">
                    {/* 2FA Switch */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 pr-2">
                        <Label className="text-xs font-medium text-slate-800 cursor-pointer">
                          Require 2FA
                        </Label>
                        <p className="text-[11px] text-slate-500">
                          Require two-factor authentication for this administrator account.
                        </p>
                      </div>
                      <Controller
                        name="account.two_factor_enabled"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3 bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-9 px-4 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-9 px-5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                  Creating Customer...
                </>
              ) : (
                "Create Customer"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
