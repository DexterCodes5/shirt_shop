package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.model.*;
import dev.dex.springbootshirtshop.repository.*;
import dev.dex.springbootshirtshop.util.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import org.mockito.*;
import org.mockito.junit.jupiter.*;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerOrderServiceTest {
    @Mock
    private CustomerOrderRepository customerOrderRepository;
    @Mock
    private CartItemRepository cartItemRepository;
    @Mock
    private MailService mailService;
    private CustomerOrderService underTest;

    @BeforeEach
    void setUp() {
        underTest = new CustomerOrderService(customerOrderRepository, cartItemRepository, mailService, "secretkey");
    }

    @Test
    void canPlaceOrder() {
        // given
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(1);
        Address address = new Address();
        address.setUserEmail("dexter@mail.com");
        customerOrder.setAddress(address);
        CartItem cartItem = new CartItem();
        Shirt shirt = new Shirt(1, "Slim Fit Shirt 'Ermo'", "HUGO", 157.90, 25, Color.BLACK, "description", "img");
        cartItem.setShirt(shirt);
        CartItem cartItem2 = new CartItem();
        Shirt shirt2 = new Shirt(2, "Slim Fit Shirt 'Elisha'", "HUGO", 157.90, 10, Color.BLACK, "description", "img");
        cartItem2.setShirt(shirt2);
        List<CartItem> cart = new ArrayList<>(List.of(cartItem, cartItem2));
        CustomerOrderRequest customerOrderRequest = new CustomerOrderRequest(customerOrder, cart);

        given(customerOrderRepository.save(customerOrder)).willReturn(customerOrder);

        // when
        underTest.placeOrder(customerOrderRequest);

        // then
        ArgumentCaptor<CustomerOrder> customerOrderArgumentCaptor = ArgumentCaptor.forClass(CustomerOrder.class);
        verify(customerOrderRepository).save(customerOrderArgumentCaptor.capture());
        assertThat(customerOrderArgumentCaptor.getValue()).isEqualTo(customerOrder);

        ArgumentCaptor<CartItem> cartItemArgumentCaptor =
                ArgumentCaptor.forClass(CartItem.class);
        verify(cartItemRepository, times(cart.size())).save(cartItemArgumentCaptor.capture());
        assertThat(cartItemArgumentCaptor.getAllValues().get(0)).isEqualTo(cartItem);
        assertThat(cartItemArgumentCaptor.getAllValues().get(1)).isEqualTo(cartItem2);

        ArgumentCaptor<String> toArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> titleArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> textArgumentCaptor = ArgumentCaptor.forClass(String.class);
        verify(mailService, times(2)).sendMail(toArgumentCaptor.capture(), titleArgumentCaptor.capture(), textArgumentCaptor.capture());
        assertThat(toArgumentCaptor.getAllValues().get(0)).isEqualTo("dtanchev081@gmail.com");
        assertThat(titleArgumentCaptor.getAllValues().get(0)).isEqualTo(String.format("Order n. %d", customerOrder.getId()));
        assertThat(textArgumentCaptor.getAllValues().get(0)).isEqualTo(
                "Customer email: dexter@mail.com\n" +
                "Name: null null\n" +
                "Telephone: null\n" +
                "Products: \n" +
                "Id, Name, Brand, Quantity, Price\n" +
                "1, Slim Fit Shirt 'Ermo', HUGO, 0, 0.0 BGN\n" +
                "2, Slim Fit Shirt 'Elisha', HUGO, 0, 0.0 BGN\n" +
                "==============================\n" +
                "Total: 0.0 BGN"
        );
        assertThat(toArgumentCaptor.getAllValues().get(1)).isEqualTo(customerOrder.getAddress().getUserEmail());
        assertThat(titleArgumentCaptor.getAllValues().get(1)).isEqualTo("Successful Order");
        assertThat(textArgumentCaptor.getAllValues().get(1)).isEqualTo("Thank you for choosing Shirt Shop! We are going to send the shipment in the following days.");
    }
}