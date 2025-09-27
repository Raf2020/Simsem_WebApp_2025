"use client";

import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  TextInput,
  Paper,
  Flex,
  Loader,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { usePayment } from "../contexts/PaymentContext";

interface PaymentStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onComplete, onBack }: PaymentStepProps) {
  const {
    form,
    isVerifyingIban,
    ibanVerified,
    verifyIban,
    canProceed
  } = usePayment();

  const { register, formState: { errors }, watch } = form;
  const ibanValue = watch('iban');

  return (
    <Stack
      gap="lg"
      style={{
        maxWidth: 962,
        width: "100%",
      }}
    >
      <Paper
        p={{ base: "sm", sm: "xl" }}
        py={"xl"}
        radius="lg"
        withBorder
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Stack align="center">
          <Stack gap={24} w={{ base: "100%", sm: 526 }}>
            <Box ta={{ base: "center", sm: "left" }}>
              <Title
                order={2}
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "#0D2E61",
                  marginBottom: "24px",
                }}
              >
                Payment Information
              </Title>
            </Box>

            <Box>
              <Box
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "16px 20px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Barlow",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#374151",
                  }}
                >
                  IBAN
                </Text>
              </Box>

              <Text
                ta="center"
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 400,
                  fontSize: "16px",
                  color: "#6b7280",
                  marginBottom: "24px",
                }}
              >
                Fill out your bank account information.
              </Text>

              <Stack gap={16}>
                <TextInput
                  placeholder="Your Full Name"
                  {...register('fullName')}
                  error={errors.fullName?.message}
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                <TextInput
                  placeholder="Your Address"
                  {...register('address')}
                  error={errors.address?.message}
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                <TextInput
                  placeholder="Bank Name"
                  {...register('bankName')}
                  error={errors.bankName?.message}
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                <TextInput
                  placeholder="IBAN"
                  {...register('iban')}
                  error={errors.iban?.message}
                  rightSectionWidth={100}
                  rightSection={
                    <Button
                      p={0}
                      m={0}
                      variant="transparent"
                      color={ibanVerified ? "#10b981" : "#0D2E61"}
                      onClick={() => verifyIban(ibanValue)}
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      {isVerifyingIban ? (
                        <Loader size="xs" />
                      ) : ibanVerified ? (
                        <>
                          <IconCheck size={16} />
                          Verified
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  }
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                <TextInput
                  placeholder="SWIFT/BIC"
                  {...register('swiftBic')}
                  error={errors.swiftBic?.message}
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                <TextInput
                  placeholder="Bank Address"
                  {...register('bankAddress')}
                  error={errors.bankAddress?.message}
                  styles={{
                    input: {
                      backgroundColor: "#f3f4f6",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 20px",
                      height: "56px",
                      fontFamily: "Barlow",
                      fontSize: "16px",
                      color: "#374151",
                      "&::placeholder": {
                        color: "#9ca3af",
                      },
                      "&:focus": {
                        backgroundColor: "#f3f4f6",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Flex
        justify="space-between"
        gap={12}
        direction={{ base: "column", sm: "row" }}
      >
        <Button
          variant="filled"
          size="md"
          onClick={onBack}
          w={{ base: "100%", sm: "auto" }}
          style={{
            backgroundColor: "#d1d5db",
            color: "#6b7280",
            border: "none",
            borderRadius: "6px",
            height: "44px",
            fontSize: "14px",
            fontWeight: 500,
            minWidth: "120px",
          }}
        >
          Back
        </Button>

        <Button
          size="md"
          onClick={onComplete}
          disabled={!canProceed}
          w={{ base: "100%", sm: "auto" }}
          style={{
            backgroundColor: canProceed ? "#f59e0b" : "#d1d5db",
            color: canProceed ? "white" : "#6b7280",
            border: "none",
            borderRadius: "6px",
            height: "44px",
            fontSize: "14px",
            fontWeight: 500,
            minWidth: "120px",
            cursor: canProceed ? "pointer" : "not-allowed",
          }}
        >
          Proceed
        </Button>
      </Flex>
    </Stack>
  );
}
