<div class="spinner" />

<style lang="scss">
  @import "../styles/variables";

  @mixin circle($dim) {
    border-radius: $dim;
    height: $dim;
    width: $dim;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite running;
    background-image: conic-gradient(transparentize(gray, 1), gray);
    margin: 2pc auto 1pc;
    position: relative;
    @include circle(50px);

    &::after {
      content: "";
      background-color: $form-bg-color;
      position: absolute;
      left: 10px;
      top: 10px;
      @include circle(30px);
    }
  }
</style>
