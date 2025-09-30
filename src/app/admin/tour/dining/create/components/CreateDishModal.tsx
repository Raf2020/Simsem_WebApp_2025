'use client';

import {
  Modal,
  Text,
  Button,
  Stack,
  Group,
  TextInput,
  Select,
  Textarea,
  FileInput,
  rem
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUpload, IconX, IconCheck, IconX as IconError } from '@tabler/icons-react';
import { useState } from 'react';

interface CreateDishModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (dishData: CreateDishFormData) => void;
  categoryId: string;
  categoryName: string;
}

export interface CreateDishFormData {
  name: string;
  course: string;
  type: string;
  ingredients: string;
  image: File | null;
}

export default function CreateDishModal({
  opened,
  onClose,
  onConfirm,
  categoryId,
  categoryName
}: CreateDishModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API configuration
  const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    applicationId: process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
    restApiKey: process.env.NEXT_PUBLIC_PARSE_REST_API_KEY,
  };

  const form = useForm<CreateDishFormData>({
    initialValues: {
      name: '',
      course: categoryId === 'main-course' ? 'main' : categoryId,
      type: 'Vegetarian',
      ingredients: '',
      image: null,
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Dish name must be at least 2 characters' : null),
      ingredients: (value) => (value.trim().length < 10 ? 'Please provide more detailed ingredients' : null),
    },
  });

  const handleImageChange = (file: File | null) => {
    form.setFieldValue('image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // API call to create dish
  const createDishAPI = async (dishData: CreateDishFormData) => {
    const payload = {
      type: dishData.type,
      name: dishData.name,
      ingredients: dishData.ingredients,
      country: "Egypt",
      course: dishData.course,
      // Set image to undefined for now to avoid schema mismatch
      image: undefined
    };

    const response = await fetch(`${API_CONFIG.baseUrl}/classes/OfferedDish`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': API_CONFIG.applicationId!,
        'X-Parse-REST-API-Key': API_CONFIG.restApiKey!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const handleSubmit = async (values: CreateDishFormData) => {
    setIsSubmitting(true);

    try {
      // Call the API to create the dish
      const result = await createDishAPI(values);

      // Show success notification
      notifications.show({
        title: 'Success!',
        message: `"${values.name}" has been added to the menu successfully.`,
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 5000,
      });

      // Call the parent's onConfirm with the values
      onConfirm(values);

      // Reset form and close modal
      form.reset();
      setImagePreview(null);
      onClose();

    } catch (error) {
      console.error('Error creating dish:', error);

      // Show error notification
      notifications.show({
        title: 'Error',
        message: 'Failed to create dish. Please try again.',
        color: 'red',
        icon: <IconError size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setImagePreview(null);
    onClose();
  };

  const courseOptions = [
    { value: 'starter', label: 'Starter' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
  ];

  const typeOptions = [
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Meat', label: 'Meat' },
  ];

  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      title={
        <Text
          style={{
            fontFamily: 'DM Serif Display',
            fontSize: '24px',
            fontWeight: 400,
            color: '#0D2E61'
          }}
        >
          Create your own dish
        </Text>
      }
      size="lg"
      centered
      styles={{
        header: {
          paddingBottom: rem(20),
        },
        body: {
          paddingTop: 0,
        },
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="lg">
          {/* Dish Name */}
          <TextInput
            label="Dish Name"
            placeholder="Enter dish name"
            required
            {...form.getInputProps('name')}
            styles={{
              label: {
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                color: '#3D3D3D',
                marginBottom: '8px',
              },
              input: {
                fontFamily: 'Barlow',
                fontSize: '16px',
                borderRadius: '8px',
                height: '48px',
              },
            }}
          />

          {/* Course and Type Row */}
          <Group grow>
            <Select
              label="Dish Course"
              data={courseOptions}
              required
              {...form.getInputProps('course')}
              styles={{
                label: {
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#3D3D3D',
                  marginBottom: '8px',
                },
                input: {
                  fontFamily: 'Barlow',
                  fontSize: '16px',
                  borderRadius: '8px',
                  height: '48px',
                },
              }}
            />

            <Select
              label="Dish Type"
              data={typeOptions}
              required
              {...form.getInputProps('type')}
              styles={{
                label: {
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#3D3D3D',
                  marginBottom: '8px',
                },
                input: {
                  fontFamily: 'Barlow',
                  fontSize: '16px',
                  borderRadius: '8px',
                  height: '48px',
                },
              }}
            />
          </Group>

          {/* Ingredients and Photo Row */}
          <Group align="flex-start" grow>
            <Textarea
              label="Ingredients"
              placeholder="Describe your dishes"
              required
              minRows={6}
              {...form.getInputProps('ingredients')}
              styles={{
                label: {
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#3D3D3D',
                  marginBottom: '8px',
                },
                input: {
                  fontFamily: 'Barlow',
                  fontSize: '16px',
                  borderRadius: '8px',
                  minHeight: '140px',
                },
              }}
            />

            <Stack gap="xs">
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#3D3D3D',
                }}
              >
                Dish Photo
              </Text>
              
              <FileInput
                accept="image/*"
                placeholder="Upload or drag photo here"
                leftSection={<IconUpload size={16} />}
                onChange={handleImageChange}
                styles={{
                  input: {
                    fontFamily: 'Barlow',
                    fontSize: '14px',
                    borderRadius: '8px',
                    height: '140px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    borderColor: '#E5E7EB',
                    backgroundColor: '#F9FAFB',
                  },
                }}
              />
              
              {imagePreview && (
                <div style={{ position: 'relative', marginTop: '8px' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <Button
                    size="xs"
                    variant="filled"
                    color="red"
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      minWidth: 'auto',
                      width: '24px',
                      height: '24px',
                      padding: 0,
                    }}
                    onClick={() => handleImageChange(null)}
                  >
                    <IconX size={12} />
                  </Button>
                </div>
              )}
            </Stack>
          </Group>

          {/* Action Buttons */}
          <Group justify="space-between" mt="xl">
            <Button
              variant="outline"
              onClick={handleCancel}
              style={{
                borderRadius: '8px',
                fontFamily: 'Barlow',
                fontWeight: 600,
                borderColor: '#E5E7EB',
                color: '#6B7280',
                height: '48px',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              style={{
                borderRadius: '8px',
                fontFamily: 'Barlow',
                fontWeight: 600,
                backgroundColor: '#FB8B24',
                height: '48px',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              {isSubmitting ? 'Creating...' : 'Confirm'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
