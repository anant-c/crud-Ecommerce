import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useProductStore } from "../store/product";
import { useState } from "react";

function ProductCard({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProducts, updateProducts } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();



  const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProducts(pid, updatedProduct);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 5000,
            isClosable: true,
        });
  }
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<RiDeleteBin6Fill />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
            <ModalHeader> Update Product </ModalHeader>
            <ModalCloseButton/>

            <ModalBody>
                <VStack spacing={4}>
                    <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    ></Input>
                    <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    ></Input>
                    <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    ></Input>
                </VStack>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id, updatedProduct)}>
                    Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalBody>
        </ModalContent>

      </Modal>
    </Box>
  );
}

export default ProductCard;
