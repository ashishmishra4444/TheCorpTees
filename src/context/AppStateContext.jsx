import React, { createContext, useContext, useReducer, useCallback } from 'react';

const initialState = {
  quoteCart: [],
  selectedIndustry: null,
  activeCategory: 'all',
  searchQuery: '',
  isCartOpen: false,
  isMobileMenuOpen: false,
  toast: null,
  userProfile: null,
  filters: {
    priceRange: [0, 50000],
    minOrder: 0,
    material: [],
    productType: [],
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_QUOTE': {
      const existing = state.quoteCart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          quoteCart: state.quoteCart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 50) }
              : item
          ),
          toast: { message: 'Quantity updated in quote cart', type: 'success' },
        };
      }
      return {
        ...state,
        quoteCart: [...state.quoteCart, { ...action.payload, quantity: action.payload.quantity || 50 }],
        isCartOpen: true,
        toast: { message: 'Added to quote cart', type: 'success' },
      };
    }
    case 'REMOVE_FROM_QUOTE':
      return {
        ...state,
        quoteCart: state.quoteCart.filter(item => item.id !== action.payload),
        toast: { message: 'Removed from quote cart', type: 'info' },
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        quoteCart: state.quoteCart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_QUOTE':
      return { ...state, quoteCart: [], toast: { message: 'Quote cart cleared', type: 'info' } };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_CART_OPEN':
      return { ...state, isCartOpen: action.payload };
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload, searchQuery: '' };
    case 'SET_INDUSTRY':
      return { ...state, selectedIndustry: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    default:
      return state;
  }
}

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToQuote = useCallback((product, quantity = 50) => {
    dispatch({ type: 'ADD_TO_QUOTE', payload: { ...product, quantity } });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3000);
  }, []);

  const removeFromQuote = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_QUOTE', payload: id });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3000);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearQuote = useCallback(() => {
    dispatch({ type: 'CLEAR_QUOTE' });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3000);
  }, []);

  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const setCartOpen = useCallback((val) => dispatch({ type: 'SET_CART_OPEN', payload: val }), []);
  const setCategory = useCallback((cat) => dispatch({ type: 'SET_CATEGORY', payload: cat }), []);
  const setIndustry = useCallback((ind) => dispatch({ type: 'SET_INDUSTRY', payload: ind }), []);
  const setSearch = useCallback((q) => dispatch({ type: 'SET_SEARCH', payload: q }), []);
  const setFilters = useCallback((f) => dispatch({ type: 'SET_FILTERS', payload: f }), []);
  const toggleMobileMenu = useCallback(() => dispatch({ type: 'TOGGLE_MOBILE_MENU' }), []);
  const setUserProfile = useCallback((p) => dispatch({ type: 'SET_USER_PROFILE', payload: p }), []);

  const cartTotal = state.quoteCart.reduce((sum, item) => sum + item.quantity, 0);
  const cartValue = state.quoteCart.reduce((sum, item) => {
    const price = item.priceEstimate || item.basePrice || 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        cartTotal,
        cartValue,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        toggleCart,
        setCartOpen,
        setCategory,
        setIndustry,
        setSearch,
        setFilters,
        toggleMobileMenu,
        setUserProfile,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
