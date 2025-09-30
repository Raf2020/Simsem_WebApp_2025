import {
  Modal,
  Text,
  Button,
  Stack,
  Box,
  Group,
  Card,
  Badge,
  SimpleGrid,
  TextInput,
  Select,
  UnstyledButton,
  Center,
  Divider
} from '@mantine/core';
import { useMediaQuery, useDebouncedValue } from '@mantine/hooks';
import { IconCoffee, IconToolsKitchen2, IconCake, IconSearch, IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useFoodData, FoodItem } from '../contexts/FoodDataContext';
import BunnyCDNImage from '@/components/BunnyCDNImage';
import CreateDishModal, { CreateDishFormData } from './CreateDishModal';

interface FoodSelectionModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (selectedItems: FoodItem[]) => void;
  categoryId: string;
  categoryName: string;
}



export default function FoodSelectionModal({
  opened,
  onClose,
  onConfirm,
  categoryId,
  categoryName
}: FoodSelectionModalProps) {
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<string>('Any Diet');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [createDishModalOpened, setCreateDishModalOpened] = useState(false);

  // Use the food data context
  const { getItemsByCategory, isLoading, error, searchItems, fetchData } = useFoodData();

  // Debounce search query
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  // Get items for the current category (default items)
  const categoryItems = getItemsByCategory(categoryId);

  // Effect to fetch data only when modal opens
  useEffect(() => {
    if (opened) {
      console.log('Modal opened, fetching data...');
      fetchData();
    }
  }, [opened, fetchData]);

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setSearchLoading(true);
      setSearchError(null);

      const dietType = dietFilter === 'Any Diet' ? undefined : dietFilter;

      searchItems(debouncedSearchQuery, categoryId, dietType)
        .then((results) => {
          setSearchResults(results);
          setSearchLoading(false);
        })
        .catch((err) => {
          setSearchError('Failed to search items');
          setSearchLoading(false);
          console.error('Search error:', err);
        });
    } else {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
    }
  }, [debouncedSearchQuery, categoryId, dietFilter, searchItems]);

  const handleItemSelect = (item: FoodItem) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(selected => selected.id === item.id);
      if (isSelected) {
        return prev.filter(selected => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedItems);
    setSelectedItems([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedItems([]);
    onClose();
  };

  const handleCreateDish = () => {
    setCreateDishModalOpened(true);
  };

  const handleCreateDishConfirm = (dishData: CreateDishFormData) => {
    // Convert the created dish to FoodItem format and add to selected items
    const newDish: FoodItem = {
      id: `custom-${Date.now()}`, // Temporary ID for custom dishes
      name: dishData.name,
      description: dishData.ingredients,
      image: dishData.image ? URL.createObjectURL(dishData.image) : '/images/temp-dish.png',
      dietaryTags: [dishData.type.toUpperCase()],
      category: dishData.course === 'main' ? 'main-course' : dishData.course,
      country: 'Custom'
    };

    setSelectedItems(prev => [...prev, newDish]);
    setCreateDishModalOpened(false);
  };

  const handleCreateDishClose = () => {
    setCreateDishModalOpened(false);
  };

  const getCategoryIcon = () => {
    switch (categoryId) {
      case 'starter':
        return <IconCoffee size={36} color="#0D2E61" />;
      case 'main-course':
        return <IconToolsKitchen2 size={36} color="#0D2E61" />;
      case 'dessert':
        return <IconCake size={36} color="#0D2E61" />;
      default:
        return <IconCoffee size={36} color="#0D2E61" />;
    }
  };

  // Use search results if searching, otherwise use category items with local filtering
  const filteredItems = debouncedSearchQuery.trim()
    ? searchResults
    : categoryItems.filter(item => {
        const matchesDiet = dietFilter === 'Any Diet' || item.dietaryTags.includes(dietFilter.toUpperCase());
        return matchesDiet;
      });

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
    <Modal
      opened={opened}
      onClose={handleCancel}
      size={925}
      title={
        <Group gap={10} justify="space-between" style={{ width: '100%', borderBottom: '1px solid #3D3D3D1A', paddingBottom: 20, }} flex={1}>
          <Group>
            {getCategoryIcon()}
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '23px',
                color: '#0D2E61'
              }}
            >
              {categoryName}
            </Text>
          </Group>
          <Group gap={15}>
            <TextInput
              placeholder="Search starter"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightSection={<IconSearch size={16} />}
              style={{ flex: 1 }}

              styles={{
                input: {
                  fontSize: "16px",
                  borderRadius: '8px',
                  fontFamily: 'Barlow',
                  height: 52,
                  width: 239,
                  color: "#3D3D3D"
                }
              }}
            />
            <Select

              value={dietFilter}
              onChange={(value) => setDietFilter(value || 'Any Diet')}
              data={['Any Diet', 'Vegan', 'Vegetarian', 'Meat']}
              style={{ minWidth: '150px' }}
              styles={{
                input: {
                  fontSize: "16px",
                  borderRadius: '8px',
                  fontFamily: 'Barlow',
                  height: 52,
                  width: 239,
                  color: "#3D3D3D"
                }
              }}
            />
          </Group>
        </Group>
      }
      closeButtonProps={{
        display: "none"
      }}
      styles={{
        title: {
          width: "100%",
          paddingTop: 20,

          paddingLeft: 30,
          paddingRight: 30
        },
        header: {
          padding: 0
        },
        body: {
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 0
        },
      }}
      px={0}
      mx={0}
      fullScreen={isMobile}

    >

      <Stack gap={30}>
        {/* Food Items Grid */}
        <Stack align='center' my={20}>
          {(isLoading || searchLoading) && (
            <Text style={{ textAlign: 'center', padding: '40px' }}>
              {searchLoading ? 'Searching...' : 'Loading food items...'}
            </Text>
          )}

          {(error || searchError) && (
            <Stack align="center" gap="md" style={{ padding: '40px' }}>
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {searchError || 'Error loading food items. Please try again.'}
              </Text>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log('Manual refresh triggered');
                  fetchData();
                }}
              >
                Refresh Data
              </Button>
            </Stack>
          )}

          {!isLoading && !searchLoading && !error && !searchError && (
            <SimpleGrid cols={3} spacing={15}>
              {filteredItems.map((item) => (
                <UnstyledButton
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                >
                  <Card
                    style={{
                      width: '268.33px',
                      height: '236.95px',
                      borderRadius: '10px',
                      padding: '20px',
                      gap: '10px',
                      opacity: 1,
                      borderWidth: '1px',
                      backgroundColor: selectedItems.some(selected => selected.id === item.id) ? '#F0F4FF' : 'white',
                      border: selectedItems.some(selected => selected.id === item.id)
                        ? '2px solid #0D2E61'
                        : '1px solid #0D2E614D',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Stack gap={10}>
                      <BunnyCDNImage
                        src={item.image}
                        alt={item.name}
                        width={228}
                        height={115}
                        fallbackSrc="/images/temp-dish.png"
                        style={{
                          borderRadius: '10px',
                          opacity: 1,
                          objectFit: 'cover'
                        }}
                      />

                      <Group justify="space-between" align="center" gap="xs" wrap="nowrap">
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 700,
                            fontSize: '18px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: '#3D3D3D',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flex: 1,
                            minWidth: 0
                          }}
                        >
                          {item.name}
                        </Text>
                        <Badge
                          size="xs"
                          style={{
                            height: '24px',
                            borderRadius: '10px',
                            gap: '10px',
                            opacity: 1,
                            paddingTop: '5px',
                            paddingRight: '10px',
                            paddingBottom: '5px',
                            paddingLeft: '10px',
                            backgroundColor: '#FB8B24',
                            color: 'white',
                            fontFamily: 'Barlow',
                            fontWeight: 700,
                            fontSize: '12px',
                            flexShrink: 0
                          }}
                        >
                          {item.dietaryTags[0]}
                        </Badge>
                      </Group>
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          color: '#3D3D3D',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.description}
                      </Text>
                    </Stack>
                  </Card>
                </UnstyledButton>
              ))}

              {/* Add Your Own Recipe Card */}
              <UnstyledButton onClick={handleCreateDish}>
                <Card
                  style={{
                    width: '268.33px',
                    height: '235px',
                    borderRadius: '10px',
                    padding: '20px',
                    gap: '10px',
                    opacity: 1,
                    borderWidth: '3px',
                    borderStyle: 'dashed',
                    border: '3px dashed #0D2E6180',
                    backgroundColor: '#0D2E611A',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Center style={{ height: '100%' }}>
                    <Stack align="center" gap={10}>
                      <Box
                        style={{
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconPlus size={48} color="#0D2E61" />
                      </Box>
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          color: '#0D2E61',
                          textAlign: 'center'
                        }}
                      >
                        Add your own recipe
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 400,
                          fontSize: '14px',
                          color: '#6B7280',
                          textAlign: 'center'
                        }}
                      >
                        Couldn&apos;t find what you&apos;re looking for? Add your own recipe to the menu!
                      </Text>
                    </Stack>
                  </Center>
                </Card>
              </UnstyledButton>
            </SimpleGrid>
          )}
        </Stack>


        {/* Action Buttons */}
      </Stack>
      <Group justify="space-between" py={20} pos={"sticky"} bottom={0} bg={"white"} style={{
        borderTop: '1px solid #3D3D3D1A'
      }}>
        <Button
          variant="outline"
          onClick={handleCancel}
          style={{
            borderRadius: '8px',
            fontFamily: 'Barlow',
            fontWeight: 600,
            borderColor: '#E5E7EB',
            color: '#6B7280'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          style={{
            borderRadius: '8px',
            fontFamily: 'Barlow',
            fontWeight: 600,
            backgroundColor: '#FB8B24',
            color: 'white'
          }}
        >
          Confirm
        </Button>
      </Group>
    </Modal>

    {/* Create Dish Modal */}
    <CreateDishModal
      opened={createDishModalOpened}
      onClose={handleCreateDishClose}
      onConfirm={handleCreateDishConfirm}
      categoryId={categoryId}
      categoryName={categoryName}
    />
  </>
  );
}




