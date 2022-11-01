<template>
  <div>
    <section class="intro">
      <div class="container">
        <div class="intro__wrapper">
          <img src="@assets/img/hinata.png" alt="" />
          <div class="intro__text">
            <h1>AnimeList - add your favorite anime</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              asperiores amet illo consectetur repudiandae perspiciatis
              praesentium exercitationem deserunt cumque adipisci iusto aut
              veritatis voluptatum, fuga doloremque impedit deleniti officiis
              beatae.
            </p>
            <a href="#">Go to my anime list</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>




<style lang="scss">
.intro {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    @media (max-width: 600px) {
      margin-top: 40px;
    }
    &::after {
      content: "";
      position: absolute;
      left: -140px;
      top: 50%;
      transform: translateY(-50%);
      background-color: $blue-light;
      background-repeat: no-repeat;
      background-size: 100%;
      border-radius: 50%;
      filter: blur(40px);
      width: 600px;
      height: 600px;
      opacity: 0.2;
      z-index: -1;
      @media (max-width: 800px) {
        width: 400px;
        height: 400px;
      }
    }
    img {
      object-fit: cover;
      object-position: top;
      width: 400px;
      animation: anim-image $tr;
      @keyframes anim-image {
        0% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }

      @media (max-width: 800px) {
        width: 200px;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
  }
  &__text {
    color: $white;
    max-width: 500px;
    padding: 0 10px;
    font-size: 18px;
    h1 {
      font-size: 24px;
      font-weight: $fw-medium;
      margin-bottom: 20px;
    }
    p {
      font-weight: $fw-light;
      line-height: 120%;
      margin-bottom: 40px;
    }
    a {
      display: inline-block;
      padding: 16px;
      font-weight: $fw-medium;
      border-radius: $br;
      color: #fff;
      background-color: $blue-light;
      transition: $tr;
      &:hover {
        box-shadow: 0px 0px 8px $blue-light;
      }
    }
  }
}
</style>