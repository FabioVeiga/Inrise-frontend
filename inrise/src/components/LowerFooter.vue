<template>
    <div class="w-full min-h-[56px] bg-[#595959] flex flex-row space-x-16 justify-center items-center pt-10 pb-6 z-20">
        <!-- Portugal Flag -->
        <div class="flex items-center mb-4 space-x-2 text-white border-2 border-[#A9A9A9] p-1 rounded-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg" alt="Portugal Flag"
                class="w-6 h-6 rounded-full">
            <span class="text-sm font-light">Portugal</span>
        </div>

        <!-- Copyright Text -->
        <p class="text-base text-white mb-4">© Copyright 2024 InRise Computadores LDA</p>

        <!-- Social Media  -->
        <div class="flex space-x-6 mb-4 text-white">
            <i class="fab fa-facebook text-xl cursor-pointer hover:text-blue-600"></i>
            <i class="fab fa-instagram text-xl cursor-pointer hover:text-pink-500"></i>
            <i class="fab fa-discord text-xl cursor-pointer hover:text-blue-500"></i>
            <i class="fab fa-tiktok text-xl cursor-pointer hover:text-black"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LowerFooter',
};
</script>