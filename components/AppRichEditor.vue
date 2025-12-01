<template>
    <div class="border border-slate-200 rounded-lg overflow-hidden bg-white">
        <!-- Toolbar -->
        <div v-if="editor" class="bg-slate-50 border-b border-slate-200 p-2 overflow-x-auto">
            <div class="flex flex-wrap gap-1 min-w-max">
                <!-- Text Formatting -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().toggleBold().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('bold'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('bold') }"
                        class="px-2.5 py-1.5 rounded transition-colors font-semibold text-sm" title="Bold (Ctrl+B)">
                        <strong>B</strong>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('italic'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('italic') }"
                        class="px-2.5 py-1.5 rounded transition-colors italic text-sm" title="Italic (Ctrl+I)">
                        <em>I</em>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('underline'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('underline') }"
                        class="px-2.5 py-1.5 rounded transition-colors underline text-sm" title="Underline (Ctrl+U)">
                        U
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('strike'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('strike') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Strikethrough">
                        <s>S</s>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleSubscript().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('subscript'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('subscript') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Subscript">
                        X<sub>2</sub>
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleSuperscript().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('superscript'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('superscript') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Superscript">
                        X<sup>2</sup>
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Font Size & Color -->
                <div class="flex gap-1 items-center">
                    <select @change="setFontSize($event)"
                        class="px-2 py-1.5 text-xs rounded border border-slate-300 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        title="Font Size">
                        <option value="">ขนาด</option>
                        <option value="12px">เล็ก</option>
                        <option value="16px">ปกติ</option>
                        <option value="20px">ใหญ่</option>
                        <option value="24px">ใหญ่มาก</option>
                    </select>
                    <input type="color"
                        @input="(e) => editor?.chain().focus().setColor((e.target as HTMLInputElement).value).run()"
                        class="w-8 h-8 rounded cursor-pointer border border-slate-300" title="Text Color" />
                    <button type="button" @click="editor.chain().focus().toggleHighlight().run()"
                        :class="{ 'bg-yellow-300 text-slate-900': editor.isActive('highlight'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('highlight') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Highlight">
                        <span class="bg-yellow-200 px-1">H</span>
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Headings -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('paragraph'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('paragraph') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Paragraph">
                        P
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('heading', { level: 1 }), 'text-slate-600 hover:bg-slate-200': !editor.isActive('heading', { level: 1 }) }"
                        class="px-2.5 py-1.5 rounded transition-colors font-bold text-xs" title="Heading 1">
                        H1
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('heading', { level: 2 }), 'text-slate-600 hover:bg-slate-200': !editor.isActive('heading', { level: 2 }) }"
                        class="px-2.5 py-1.5 rounded transition-colors font-bold text-xs" title="Heading 2">
                        H2
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('heading', { level: 3 }), 'text-slate-600 hover:bg-slate-200': !editor.isActive('heading', { level: 3 }) }"
                        class="px-2.5 py-1.5 rounded transition-colors font-bold text-xs" title="Heading 3">
                        H3
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Text Alignment -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().setTextAlign('left').run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive({ textAlign: 'left' }), 'text-slate-600 hover:bg-slate-200': !editor.isActive({ textAlign: 'left' }) }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Align Left">
                        ⬅️
                    </button>
                    <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive({ textAlign: 'center' }), 'text-slate-600 hover:bg-slate-200': !editor.isActive({ textAlign: 'center' }) }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Align Center">
                        ↔️
                    </button>
                    <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive({ textAlign: 'right' }), 'text-slate-600 hover:bg-slate-200': !editor.isActive({ textAlign: 'right' }) }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Align Right">
                        ➡️
                    </button>
                    <button type="button" @click="editor.chain().focus().setTextAlign('justify').run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive({ textAlign: 'justify' }), 'text-slate-600 hover:bg-slate-200': !editor.isActive({ textAlign: 'justify' }) }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Justify">
                        ↕️
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Lists & Indentation -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('bulletList'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('bulletList') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Bullet List">
                        • List
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('orderedList'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('orderedList') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Ordered List">
                        1. List
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleTaskList().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('taskList'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('taskList') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-xs" title="Task List">
                        ☑ Task
                    </button>
                    <button type="button" @click="editor.chain().focus().sinkListItem('listItem').run()"
                        :disabled="!editor.can().sinkListItem('listItem')"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                        title="Indent">
                        →
                    </button>
                    <button type="button" @click="editor.chain().focus().liftListItem('listItem').run()"
                        :disabled="!editor.can().liftListItem('listItem')"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                        title="Outdent">
                        ←
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Table -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="insertTable"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors text-xs"
                        title="Insert Table">
                        📊 Table
                    </button>
                    <button type="button" @click="editor.chain().focus().addColumnBefore().run()"
                        :disabled="!editor.can().addColumnBefore()"
                        class="px-2 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Add Column Before">
                        ⬅ Col
                    </button>
                    <button type="button" @click="editor.chain().focus().addColumnAfter().run()"
                        :disabled="!editor.can().addColumnAfter()"
                        class="px-2 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Add Column After">
                        Col ➡
                    </button>
                    <button type="button" @click="editor.chain().focus().deleteColumn().run()"
                        :disabled="!editor.can().deleteColumn()"
                        class="px-2 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Delete Column">
                        ✖ Col
                    </button>
                    <button type="button" @click="editor.chain().focus().addRowBefore().run()"
                        :disabled="!editor.can().addRowBefore()"
                        class="px-2 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Add Row Before">
                        ⬆ Row
                    </button>
                    <button type="button" @click="editor.chain().focus().addRowAfter().run()"
                        :disabled="!editor.can().addRowAfter()"
                        class="px-2 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Add Row After">
                        Row ⬇
                    </button>
                    <button type="button" @click="editor.chain().focus().deleteRow().run()"
                        :disabled="!editor.can().deleteRow()"
                        class="px-2 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Delete Row">
                        ✖ Row
                    </button>
                    <button type="button" @click="editor.chain().focus().deleteTable().run()"
                        :disabled="!editor.can().deleteTable()"
                        class="px-2 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                        title="Delete Table">
                        ✖ Table
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Special Blocks -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('blockquote'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('blockquote') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Blockquote">
                        💬
                    </button>
                    <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('codeBlock'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('codeBlock') }"
                        class="px-2.5 py-1.5 rounded transition-colors font-mono text-xs" title="Code Block">
                        { }
                    </button>
                    <button type="button" @click="editor.chain().focus().setHorizontalRule().run()"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors text-sm"
                        title="Horizontal Line">
                        ─
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Media -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="setLink"
                        :class="{ 'bg-primary-600 text-white': editor.isActive('link'), 'text-slate-600 hover:bg-slate-200': !editor.isActive('link') }"
                        class="px-2.5 py-1.5 rounded transition-colors text-sm" title="Link">
                        🔗
                    </button>
                    <button type="button" @click="addImage"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors text-sm"
                        title="Image">
                        🖼️
                    </button>
                    <button type="button" @click="addYoutube"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors text-sm"
                        title="YouTube">
                        ▶️
                    </button>
                </div>

                <div class="w-px h-6 bg-slate-300 self-center"></div>

                <!-- Clear & Undo/Redo -->
                <div class="flex gap-1 items-center">
                    <button type="button" @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
                        class="px-2.5 py-1.5 rounded text-orange-600 hover:bg-orange-50 transition-colors text-xs"
                        title="Clear Formatting">
                        🧹 Clear
                    </button>
                    <button type="button" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                        title="Undo (Ctrl+Z)">
                        ↩️
                    </button>
                    <button type="button" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()"
                        class="px-2.5 py-1.5 rounded text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                        title="Redo (Ctrl+Shift+Z)">
                        ↪️
                    </button>
                </div>
            </div>
        </div>

        <!-- Editor Content -->
        <editor-content :editor="editor" class="prose max-w-none p-4 min-h-[300px] outline-none" />

        <!-- Character Count -->
        <div v-if="editor"
            class="bg-slate-50 border-t border-slate-200 px-4 py-2 flex justify-between items-center text-xs text-slate-500">
            <div>
                <span class="font-medium">{{ characterCount.characters }}</span> characters,
                <span class="font-medium">{{ characterCount.words }}</span> words
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { CharacterCount } from '@tiptap/extension-character-count'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3]
            }
        }),
        Image,
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'text-primary-600 hover:text-primary-700 underline'
            }
        }),
        Youtube.configure({
            controls: false,
            HTMLAttributes: {
                class: 'w-full aspect-video'
            }
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Underline,
        Highlight.configure({
            multicolor: false
        }),
        TextStyle,
        Color,
        Table.configure({
            resizable: true,
            HTMLAttributes: {
                class: 'border-collapse table-auto w-full'
            }
        }),
        TableRow,
        TableHeader,
        TableCell,
        Subscript,
        Superscript,
        TaskList,
        TaskItem.configure({
            nested: true,
        }),
        CharacterCount,
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

const characterCount = computed(() => {
    if (!editor.value) return { characters: 0, words: 0 }
    return {
        characters: editor.value.storage.characterCount.characters(),
        words: editor.value.storage.characterCount.words()
    }
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
    if (editor.value && newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(newValue, { emitUpdate: false })
    }
})

const setFontSize = (event: Event) => {
    const size = (event.target as HTMLSelectElement).value
    if (size) {
        editor.value?.chain().focus().setMark('textStyle', { fontSize: size }).run()
    }
}

const insertTable = () => {
    editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

const setLink = () => {
    const previousUrl = editor.value?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
        return
    }

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
/* TipTap Editor Styles */
.ProseMirror {
    outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
}

/* Heading Styles */
.ProseMirror h1 {
    font-size: 2em;
    font-weight: bold;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
}

.ProseMirror h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
}

.ProseMirror h3 {
    font-size: 1.17em;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 1em;
}

/* List Styles */
.ProseMirror ul,
.ProseMirror ol {
    padding-left: 2rem;
    margin: 1em 0;
}

.ProseMirror ul {
    list-style-type: disc;
}

.ProseMirror ol {
    list-style-type: decimal;
}

.ProseMirror li {
    margin: 0.25em 0;
}

/* Task List Styles */
.ProseMirror ul[data-type="taskList"] {
    list-style: none;
    padding-left: 0;
}

.ProseMirror ul[data-type="taskList"] li {
    display: flex;
    align-items: flex-start;
}

.ProseMirror ul[data-type="taskList"] li>label {
    flex: 0 0 auto;
    margin-right: 0.5rem;
    user-select: none;
}

.ProseMirror ul[data-type="taskList"] li>div {
    flex: 1 1 auto;
}

.ProseMirror ul[data-type="taskList"] input[type="checkbox"] {
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
}

/* Blockquote Styles */
.ProseMirror blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1em 0;
    color: #64748b;
    font-style: italic;
}

/* Code Block Styles */
.ProseMirror pre {
    background: #1e293b;
    color: #e2e8f0;
    font-family: 'Courier New', monospace;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1em 0;
}

.ProseMirror code {
    background: #f1f5f9;
    color: #e11d48;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.ProseMirror pre code {
    background: transparent;
    color: inherit;
    padding: 0;
}

/* Highlight Styles */
.ProseMirror mark {
    background-color: #fef08a;
    padding: 0.1em 0.2em;
    border-radius: 0.125rem;
}

/* Link Styles */
.ProseMirror a {
    color: #3b82f6;
    text-decoration: underline;
    cursor: pointer;
}

.ProseMirror a:hover {
    color: #2563eb;
}

/* Horizontal Rule */
.ProseMirror hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2em 0;
}

/* Image Styles */
.ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1em 0;
}

/* YouTube Video Styles */
.ProseMirror iframe {
    border-radius: 0.5rem;
    margin: 1em 0;
}

/* Table Styles */
.ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 1em 0;
    overflow: hidden;
}

.ProseMirror table td,
.ProseMirror table th {
    min-width: 1em;
    border: 2px solid #cbd5e1;
    padding: 0.5rem;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
}

.ProseMirror table th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f5f9;
}

.ProseMirror table .selectedCell {
    background-color: #dbeafe;
}

.ProseMirror table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #3b82f6;
    pointer-events: none;
}

/* Subscript & Superscript */
.ProseMirror sub {
    vertical-align: sub;
    font-size: smaller;
}

.ProseMirror sup {
    vertical-align: super;
    font-size: smaller;
}
</style>
