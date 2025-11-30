<template>
    <div class="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <!-- Toolbar -->
        <div v-if="editor" class="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1">
            <button type="button" @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('bold'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('bold') }"
                class="p-1.5 rounded transition-colors" title="Bold">
                <strong>B</strong>
            </button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('italic'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('italic') }"
                class="p-1.5 rounded transition-colors" title="Italic">
                <em>I</em>
            </button>
            <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('strike'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('strike') }"
                class="p-1.5 rounded transition-colors" title="Strikethrough">
                <s>S</s>
            </button>

            <div class="w-px h-6 bg-slate-300 mx-1 self-center"></div>

            <button type="button" @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('paragraph'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('paragraph') }"
                class="p-1.5 rounded transition-colors" title="Paragraph">
                P
            </button>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('heading', { level: 2 }), 'text-slate-600 hover:bg-slate-200': !editor.isActive('heading', { level: 2 }) }"
                class="p-1.5 rounded transition-colors font-bold" title="Heading 2">
                H2
            </button>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('heading', { level: 3 }), 'text-slate-600 hover:bg-slate-200': !editor.isActive('heading', { level: 3 }) }"
                class="p-1.5 rounded transition-colors font-bold" title="Heading 3">
                H3
            </button>

            <div class="w-px h-6 bg-slate-300 mx-1 self-center"></div>

            <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('bulletList'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('bulletList') }"
                class="p-1.5 rounded transition-colors" title="Bullet List">
                • List
            </button>
            <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('orderedList'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('orderedList') }"
                class="p-1.5 rounded transition-colors" title="Ordered List">
                1. List
            </button>

            <div class="w-px h-6 bg-slate-300 mx-1 self-center"></div>

            <button type="button" @click="setLink"
                :class="{ 'bg-slate-200 text-slate-900': editor.isActive('link'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('link') }"
                class="p-1.5 rounded transition-colors" title="Link">
                🔗
            </button>
            <button type="button" @click="addImage"
                class="p-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors" title="Image">
                🖼️
            </button>
            <button type="button" @click="addYoutube"
                class="p-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors" title="YouTube">
                ▶️
            </button>

            <div class="w-px h-6 bg-slate-300 mx-1 self-center"></div>

            <button type="button" @click="editor.chain().focus().undo().run()"
                class="p-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors" title="Undo">
                ↩️
            </button>
            <button type="button" @click="editor.chain().focus().redo().run()"
                class="p-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors" title="Redo">
                ↪️
            </button>
        </div>

        <!-- Editor Content -->
        <editor-content :editor="editor" class="prose max-w-none p-4 min-h-[300px] outline-none" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Image,
        Link.configure({
            openOnClick: false,
        }),
        Youtube.configure({
            controls: false,
        }),
    ],
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-[150px]',
        },
    },
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
    if (editor.value && newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(newValue, { emitUpdate: false })
    }
})

const setLink = () => {
    const previousUrl = editor.value?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
        return
    }

    // empty
    if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

    // update link
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
    const url = window.prompt('Image URL')

    if (url) {
        editor.value?.chain().focus().setImage({ src: url }).run()
    }
}

const addYoutube = () => {
    const url = window.prompt('YouTube URL')

    if (url) {
        editor.value?.chain().focus().setYoutubeVideo({ src: url }).run()
    }
}

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>

<style>
/* Basic Prose Mirror styles */
.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
}
</style>
