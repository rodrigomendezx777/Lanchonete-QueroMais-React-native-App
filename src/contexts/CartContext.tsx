import React, { createContext, useState, useContext } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity?: number;
}

interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingProduct = currentCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId && item.quantity && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 



 //como foi que foi feito o carrinho no dashLoja e CartScreen 

 
// Para tornar o carrinho funcional e manter os produtos selecionados entre as telas, precisamos implementar um gerenciamento de estado global. Vou ajudar você a implementar isso usando o Context API do React.

// Primeiro, vamos criar um contexto para o carrinho. Vou criar um novo arquivo para gerenciar o estado do carrinho:

// ```typescript jsx:src/contexts/CartContext.tsx
// import React, { createContext, useState, useContext } from 'react';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: any;
//   quantity?: number;
// }

// interface CartContextData {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   increaseQuantity: (productId: string) => void;
//   decreaseQuantity: (productId: string) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextData>({} as CartContextData);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart(currentCart => {
//       const existingProduct = currentCart.find(item => item.id === product.id);
      
//       if (existingProduct) {
//         return currentCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: (item.quantity || 1) + 1 }
//             : item
//         );
//       }
      
//       return [...currentCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setCart(currentCart => currentCart.filter(item => item.id !== productId));
//   };

//   const increaseQuantity = (productId: string) => {
//     setCart(currentCart =>
//       currentCart.map(item =>
//         item.id === productId
//           ? { ...item, quantity: (item.quantity || 1) + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId: string) => {
//     setCart(currentCart =>
//       currentCart.map(item =>
//         item.id === productId && item.quantity && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }
// ```


// Agora, vamos adicionar o CartProvider ao layout principal da aplicação:

// ```typescript jsx:src/app/_layout.tsx
// import { CartProvider } from '@/contexts/CartContext';

// // ... existing code ...

// export default function RootLayout() {
//   return (
//     <CartProvider>
//       // ... existing code ...
//     </CartProvider>
//   );
// }
// // ... existing code ...
// ```


// Agora, vamos atualizar a tela DashLoja para usar o contexto do carrinho:

// ```typescript jsx:src/app/(dash)/(dashLoja)/dashLoja.tsx
// import { useCart } from '@/contexts/CartContext';

// // ... existing code ...

// const Dashloja = () => {
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const { cart, addToCart } = useCart();

//   // ... existing code ...

//   const handleAddToCart = (product: Product) => {
//     addToCart(product);
//   };

//   return (
//     // ... existing code ...
//     <View style={styles.cartSummary}>
//       <Text style={styles.cartSummaryText}>Itens no Carrinho: {cart.length}</Text>
//       <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/(dash)/(dashLoja)/CartScreen')}>
//         <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
//       </TouchableOpacity>
//     </View>
//     // ... existing code ...
//   );
// };
// // ... existing code ...
// ```






// Por fim, vamos atualizar a tela CartScreen para usar o contexto do carrinho:

// ```typescript jsx:src/app/(dash)/(dashLoja)/CartScreen.tsx
// import { useCart } from '@/contexts/CartContext';

// const CartScreen = () => {
//   const router = useRouter();
//   const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

//   const handleRemoveProduct = (id: string) => {
//     removeFromCart(id);
//   };

//   const handleIncreaseQuantity = (id: string) => {
//     increaseQuantity(id);
//   };

//   const handleDecreaseQuantity = (id: string) => {
//     decreaseQuantity(id);
//   };

//   const totalPrice = cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

//   return (
//     // ... existing code ...
//     <ScrollView contentContainerStyle={styles.productsContainer}>
//       {cart.map(product => (
//         <View key={product.id} style={styles.productCard}>
//           <Image source={product.image} style={styles.productImage} resizeMode="contain" />
//           <View style={styles.productDetails}>
//             <Text style={styles.productName}>{product.name}</Text>
//             <Text style={styles.productPrice}>R$ {product.price}</Text>
//             <View style={styles.quantityControl}>
//               <TouchableOpacity onPress={() => handleDecreaseQuantity(product.id)}>
//                 <Feather name="minus-circle" size={24} color={theme.colors.vermelhoclaro} />
//               </TouchableOpacity>
//               <Text style={styles.quantityText}>{product.quantity || 1}</Text>
//               <TouchableOpacity onPress={() => handleIncreaseQuantity(product.id)}>
//                 <Feather name="plus-circle" size={24} color={theme.colors.vermelhoclaro} />
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity onPress={() => handleRemoveProduct(product.id)}>
//               <Feather name="trash-2" size={24} color={theme.colors.vermelhoclaro} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//     // ... existing code ...
//   );
// };
// // ... existing code ...
// ```


// Agora o carrinho está totalmente funcional! Aqui está o que foi implementado:

// 1. Criamos um `CartContext` que gerencia o estado global do carrinho
// 2. Adicionamos o `CartProvider` ao layout principal da aplicação
// 3. Atualizamos a tela `DashLoja` para usar o contexto do carrinho ao adicionar produtos
// 4. Atualizamos a tela `CartScreen` para usar o contexto do carrinho ao exibir, remover e alterar quantidade dos produtos

// Principais funcionalidades implementadas:

// - Adicionar produtos ao carrinho
// - Ver quantidade de itens no carrinho
// - Aumentar/diminuir quantidade de cada produto
// - Remover produtos do carrinho
// - Cálculo automático do preço total
// - Persistência do carrinho entre as telas

// O carrinho agora mantém seu estado enquanto o usuário navega entre as telas. Quando um produto é adicionado na tela `DashLoja`, ele estará disponível na tela `CartScreen` e vice-versa.

// Quer que eu faça algum ajuste adicional ou tem alguma dúvida sobre a implementação?
