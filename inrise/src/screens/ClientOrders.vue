<template>
    <HomeContentView>
        <h1 class="text-3xl font-semibold my-12 text-center">Seus pedidos</h1>

        <div v-if="loading" class="text-center text-gray-500">Loading...</div>

        <table v-if="orders.length > 0" class="min-w-full bg-white shadow-md my-12 rounded-lg overflow-hidden">
            <thead class="max-w-screen bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Número do Pedido</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Data</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Estado do pedido</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Preço Total</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Produtos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id" class="border-b">
                    <td class="px-4 py-2 text-sm text-gray-800">{{ order.number }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ formatDate(order.date) }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ order.status }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ order.totalPrice.toFixed(2) }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">
                        <ul>
                            <li v-for="item in order.orderItems" :key="item.nome" class="list-disc ml-4">
                                {{ item.nome }} - ${{ item.price.toFixed(2) }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="orders.length === 0 && !loading" class="text-center text-gray-500">
            Nenhum pedido encontrado.
        </div>
    </HomeContentView>
</template>

<script>
import { fetchOrdersByUserId } from '@/api';
import HomeContentView from '@/components/HomeContentView.vue';
import Cookies from 'js-cookie';

export default {
    name: 'ClientOrders',
    components:{
        HomeContentView
    },
    data() {
        return {
            orders: [],
            loading: true,
        };
    },
    created() {
        this.loadOrders();
    },
    methods: {
        async loadOrders() {
            try {
                const userId = Cookies.get('userId');
                if (userId) {
                    const response = await fetchOrdersByUserId(userId);

                    if (response.status === 200) {

                        this.orders = response.data.data;
                    }
                } else {
                    console.error('User ID is missing');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        }
    }
};
</script>

<style scoped>
</style>