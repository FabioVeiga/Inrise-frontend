import { fetchAllSoftware, fetchAllSoftwareGroup, editSoftwareGroup, fetchSoftwareGroupById, fetchCpuById, fetchGpuById, fetchRamById, deleteSoftwareGroup, registerImage } from '@/api';

export async function fetchSoftwareDetails(software) {
    try {
        const [minCpu, maxCpu, minGpu, maxGpu, minRam, maxRam] = await Promise.all([
            fetchCpuById(software.processadorMinId),
            fetchCpuById(software.processadorIdealId),
            fetchGpuById(software.videoBoardMinId),
            fetchGpuById(software.videoBoardIdealId),
            fetchRamById(software.memoryRamMinId),
            fetchRamById(software.memoryRamIdealId),
        ]);

        software.processadorMin = minCpu.data;
        software.processadorIdeal = maxCpu.data;
        software.videoBoardMin = minGpu.data;
        software.videoBoardIdeal = maxGpu.data;
        software.memoryRamMin = minRam.data;
        software.memoryRamIdeal = maxRam.data;
    } catch (error) {
        console.error('Erro ao carregar detalhes dos componentes para o software', software.id, error);
    }
}

export async function loadCategories() {
    try {
        const response = await fetchAllSoftwareGroup();
        const categories = response.data.items;
        for (let category of categories) {
            const categoryDetails = await fetchSoftwareGroupById(category.id);
            if (categoryDetails && categoryDetails.data) {
                category.images = categoryDetails.data.data.images;
            }
        }
        return categories;
    } catch (error) {
        console.error('Erro ao carregar os grupos de software:', error);
        return [];
    }
}

export async function toggleCategory(categoryId, categories) {
    const category = categories[categoryId];
    if (!category.softwares && !category.isLoading) {
        category.isLoading = true;
        try {
            const softwaresRes = await fetchAllSoftware(category.id);
            category.softwares = softwaresRes.data.items.filter(software => software.categoryId === category.id);
            for (let software of category.softwares) {
                await fetchSoftwareDetails(software);
            }
            category.isOpen = true;
        } catch (error) {
            console.error('Erro ao carregar softwares da categoria', categoryId, error);
        } finally {
            category.isLoading = false;
        }
    } else if (category.softwares) {
        category.isOpen = !category.isOpen;
    }
}

export async function fetchCategories() {
    try {
        return await loadCategories();
    } catch (error) {
        console.error('Erro ao carregar categorias de software', error);
        return {};
    }
}

export async function deleteCategory(categoryId, categories) {
    const category = categories[categoryId];
    try {
        await deleteSoftwareGroup(category.id);
        alert('Grupo excluído com sucesso!');
        setTimeout(() => {
            location.reload();
        }, 100);
    } catch (error) {
        console.error('Erro ao excluir o grupo de software', categoryId, error);
        alert('Erro ao excluir o grupo.');
    }
}

export async function updateCategory(categoryId, categories) {
    const category = categories[categoryId];
    try {
        const response = await editSoftwareGroup(category.id, category);
        console.log(response)
        alert('Grupo atualizado com sucesso!');
        setTimeout(() => {
            location.reload();
        }, 100);
    } catch (error) {
        console.error('Erro ao atualizar o grupo de software', categoryId, error);
        alert('Erro ao atualizar o grupo.');
    }
}

export function handleDragStart(index, categoryId, event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('index', index);
    event.dataTransfer.setData('categoryId', categoryId);
}

export function handleDragOver(event) {
    event.preventDefault();
}

export function handleDrop(index, category, event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('index');
    const draggedItem = category.softwares[draggedIndex];
    const targetItem = category.softwares[index];

    category.softwares[draggedIndex] = targetItem;
    category.softwares[index] = draggedItem;

    saveOrder(category);
}

// softwareUtils.js

export function handleImageUpload(event, category) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            category.imagePreview = e.target.result;
            category.images[0] = file;
        };
        reader.readAsDataURL(file);
    }
}

export function editCategory(categoryId, categories) {
    const category = categories[categoryId];
    category.isEditing = true;
    category.editName = category.name;
}

export async function saveChanges(categoryId, categories) {
    const category = categories[categoryId];
    const updatedData = { name: category.editName };

    try {
        await editSoftwareGroup(category.id, updatedData);
        category.name = category.editName;

        if (category.images[0]) {
            const imageResponse = await registerImage('category', category.id, category.images[0]);
            console.log('Imagem cadastrada com sucesso!', imageResponse);
        }
        category.isEditing = false;

        alert('Grupo atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao editar grupo de software:', error);
        alert('Erro ao salvar as alterações.');
    }
}

export function cancelChanges(categoryId, categories) {
    const category = categories[categoryId];
    category.isEditing = false;
}


export function handleImageDrop(event, category) {
    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            category.imagePreview = e.target.result;
            category.images[0] = file;
        };
        reader.readAsDataURL(file);
    }
}


export function triggerFileInput(categoryId, refs) {
    refs['fileInput' + categoryId][0].click();
}


export function handleDragEnd(event) {
    event.dataTransfer.setData('index', null);
}
export function saveOrder(category) {
    const updatedOrder = category.softwares;
    console.log("Updated Order: ", updatedOrder);
}
