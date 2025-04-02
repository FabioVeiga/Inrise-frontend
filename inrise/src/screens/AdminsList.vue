/* AdminsList.vue */
<template>
    <div class="adminList">
        <h1 class="text-3xl font-semibold my-12 text-center">Lista de Administradores</h1>

        <div v-if="loading" class="text-center text-gray-500">Carregando administradores...</div>

        <table v-if="admins.length > 0" class="min-w-full bg-white shadow-md my-12 rounded-lg overflow-hidden">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Nome</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Telefone</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Ativo</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="admin in admins" :key="admin.id" class="border-b">
                    <td class="px-4 py-2 text-sm text-gray-800">{{ admin.name }} {{ admin.lastname }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ admin.email }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ admin.phoneNumber || 'N/A' }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">
                        <span :class="admin.active ? 'text-green-600' : 'text-red-600'">
                            {{ admin.active ? 'Sim' : 'Não' }}
                        </span>
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-800 flex space-x-2">
                        <button @click="editAdmin(admin)" class="action-button edit">✏️</button>
                        <button @click="deleteAdmin(admin.id)" class="action-button delete">🗑️</button>
                        <button @click="toggleActive(admin)"
                            :class="admin.active ? 'action-button deactivate' : 'action-button activate'">
                            {{ admin.active ? '🔴' : '🟢' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { fetchAllUsers, updateUserStatus, deleteUserById } from "@/api/";

export default {
    name: "AdminsList",
    data() {
        return {
            admins: [],
            loading: false,
        };
    },
    mounted() {
        console.log(this.$router.options.routes);
    },
    methods: {
        async fetchAdmins() {
            this.loading = true;
            try {
                const response = await fetchAllUsers({ profile: 1 });
                this.admins = response.data.items;
            } catch (err) {
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        async toggleActive(admin) {
            admin.active = !admin.active;
            await updateUserStatus(admin.id, admin.active);
        },
        async deleteAdmin(adminId) {
            await deleteUserById(adminId);
            this.fetchAdmins();
        },
        editAdmin(admin) {
            alert(`Editando administrador: ${admin.name}`);
        },
    },
    created() {
        this.fetchAdmins();
    },
};
</script>

<style scoped>
/* Styles for both admin and user lists */
.action-button {
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.edit {
    background: #ffc107;
}

.delete {
    background: #dc3545;
    color: white;
}

.activate {
    background: #28a745;
}

.deactivate {
    background: #ff5722;
}
</style>
