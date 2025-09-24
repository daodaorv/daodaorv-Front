<template>
    <button 
        :class="buttonClasses" 
        :style="customStyle"
        :disabled="disabled || loading"
        :loading="loading"
        :open-type="openType"
        @click="handleClick"
        @getuserinfo="handleGetUserInfo" 
        @contact="handleContact" 
        @getphonenumber="handleGetPhoneNumber"
        @opensetting="handleOpenSetting"
        @launchapp="handleLaunchApp"
        @chooseavatar="handleChooseAvatar"
    >
        <text v-if="icon && !loading" :class="['iconfont', icon, 'btn-icon']"></text>
        <text v-if="loading" class="iconfont loading icon-spin btn-icon"></text>
        <slot>{{ text }}</slot>
    </button>
</template>

<script>
    export default {
        name: 'DdButton',
        props: {
            text: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'default' // primary, success, warning, error, info, default
            },
            size: {
                type: String,
                default: 'normal' // large, normal, mini
            },
            plain: {
                type: Boolean,
                default: false
            },
            round: {
                type: Boolean,
                default: true // 默认胶囊按钮
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: ''
            },
            customStyle: {
                type: Object,
                default: () => ({})
            },
            openType: {
                type: String,
                default: ''
            }
        },
        emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'opensetting', 'launchapp', 'chooseavatar'],
        computed: {
            buttonClasses() {
                return [
                    'dd-button',
                    `dd-button--${this.type}`,
                    `dd-button--size-${this.size}`,
                    {
                        'is-plain': this.plain,
                        'is-round': this.round,
                        'is-disabled': this.disabled || this.loading,
                        'is-loading': this.loading,
                        'with-icon': !!this.icon || this.loading
                    }
                ];
            }
        },
        methods: {
            handleClick(event) {
                if (this.disabled || this.loading) return;
                this.$emit('click', event);
            },
            handleGetUserInfo(event) {
                this.$emit('getuserinfo', event);
            },
            handleContact(event) {
                this.$emit('contact', event);
            },
            handleGetPhoneNumber(event) {
                this.$emit('getphonenumber', event);
            },
            handleOpenSetting(event) {
                this.$emit('opensetting', event);
            },
            handleLaunchApp(event) {
                this.$emit('launchapp', event);
            },
            handleChooseAvatar(event) {
                this.$emit('chooseavatar', event);
            }
        }
    }
</script>

<style lang="scss" scoped>
.dd-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent; // Default border
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    margin: 0; // Reset default button margin
    padding: 0 $dd-spacing-md; // Default horizontal padding

    // Base styles that apply to all types unless overridden
    color: $dd-text-dark;
    background-color: $dd-white;
    border-color: $dd-border;

    &:active:not(.is-disabled) {
        opacity: 0.8;
    }

    // --- Sizes ---
    &--size-normal {
        height: $dd-button-height-large;
        line-height: 86rpx; // height - 2 * border-width
        font-size: $dd-font-size-md;
        padding: 0 $dd-button-padding-large; // Larger padding for normal buttons
    }
    &--size-large {
        height: 100rpx; // 超大按钮，超出标准规范
        line-height: 98rpx;
        font-size: $dd-font-size-lg;
        padding: 0 $dd-spacing-xl;
    }
    &--size-mini {
        height: $dd-button-min-touch; // 符合7mm最小触控要求
        line-height: 54rpx;
        font-size: $dd-font-size-sm;
        padding: 0 $dd-button-padding-small;
    }

    // --- Round --- 
    // Default is round (pill shape for normal size)
    &.is-round {
        // Specific roundness based on size for perfect pill
        &--size-normal { border-radius: $dd-radius-pill; } // 44rpx
        &--size-large { border-radius: 50rpx; } 
        &--size-mini { border-radius: 30rpx; }
    }
    // If not round, apply standard radius
    &:not(.is-round) {
        border-radius: $dd-radius-md;
    }

    // --- Types ---
    &--default {
        // Already covered by base styles or can be more specific if needed
        &:active:not(.is-disabled):not(.is-plain) {
            background-color: color.scale($dd-white, $lightness: -5%);
        }
    }
    &--primary {
        background-color: $dd-primary;
        border-color: $dd-primary;
        color: $dd-white;
        &:active:not(.is-disabled):not(.is-plain) {
             background-color: color.scale($dd-primary, $lightness: -10%);
        }
    }
    &--success {
        background-color: $dd-success;
        border-color: $dd-success;
        color: $dd-white;
        &:active:not(.is-disabled):not(.is-plain) {
             background-color: color.scale($dd-success, $lightness: -10%);
        }
    }
    &--warning {
        background-color: $dd-warning;
        border-color: $dd-warning;
        color: $dd-white;
         &:active:not(.is-disabled):not(.is-plain) {
             background-color: color.scale($dd-warning, $lightness: -10%);
        }
    }
    &--error {
        background-color: $dd-danger;
        border-color: $dd-danger;
        color: $dd-white;
         &:active:not(.is-disabled):not(.is-plain) {
             background-color: color.scale($dd-danger, $lightness: -10%);
        }
    }
    &--info { // Example for an info type
        background-color: $dd-link; // Assuming link color is info color
        border-color: $dd-link;
        color: $dd-white;
         &:active:not(.is-disabled):not(.is-plain) {
             background-color: color.scale($dd-link, $lightness: -10%);
        }
    }

    // --- Plain --- (Overrides type colors for background)
    &.is-plain {
        background-color: $dd-white;
        &.dd-button--primary {
            color: $dd-primary;
            border-color: $dd-primary;
             &:active:not(.is-disabled) {
                background-color: $dd-primary-light;
            }
        }
        &.dd-button--success {
            color: $dd-success;
            border-color: $dd-success;
             &:active:not(.is-disabled) {
                background-color: color.scale($dd-success, $alpha: -80%); // Lighter background
            }
        }
        &.dd-button--warning {
            color: $dd-warning;
            border-color: $dd-warning;
             &:active:not(.is-disabled) {
                background-color: color.scale($dd-warning, $alpha: -80%);
            }
        }
        &.dd-button--error {
            color: $dd-danger;
            border-color: $dd-danger;
             &:active:not(.is-disabled) {
                background-color: color.scale($dd-danger, $alpha: -80%);
            }
        }
        &.dd-button--info {
            color: $dd-link;
            border-color: $dd-link;
             &:active:not(.is-disabled) {
                background-color: color.scale($dd-link, $alpha: -80%);
            }
        }
        // Default plain button has text-dark and border-color already
    }

    // --- Disabled --- 
    &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    // --- Loading & Icon --- 
    .btn-icon {
        margin-right: $dd-spacing-xs; // Space between icon and text
        // If button only has icon and no text/slot, remove margin
        &:only-child {
             margin-right: 0;
        }
    }
    // Ensure icon size matches font size for vertical alignment, or set explicitly
    // .iconfont.btn-icon { font-size: inherit; }
}
</style>