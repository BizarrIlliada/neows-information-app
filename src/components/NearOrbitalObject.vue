<template>
  <ElCard class="box-card">
    <template #header>
      <div class="card-header">
        <span>The top list of {{ date }}</span>
      </div>
    </template>
    <ul class="box-card__list">
      <li>
        Biggest name {{ biggest.name }}, radius is {{ +biggest.estimatedDiameterMax.toFixed(3) }} km
      </li>
      <li>
        Closest name {{ closest.name }}, distance to Earth is {{ Math.round(closest.missDistance) }} km
      </li>
      <li>
        Fastest name {{ fastest.name }}, its speed is {{ Math.round(fastest.relativeVelocity) }} km/h
      </li>
      <li>
        It's {{ hazardousAmount }} hazardous object(s)
      </li>
    </ul>
  </ElCard>
</template>

<script>
  import { ElCard } from 'element-plus'

  export default {
    name: 'NearOrbitalObject',
    components: { ElCard },
    props: ['biggest', 'closest', 'fastest', 'hazardousAmount', 'date'],
  }
</script>

<style lang="scss">
  .box-card {
    margin-bottom: 10px;

    &__list {
      display: flex;
      flex-direction: column;
      align-items: start;
      list-style: none;
    }
  }
</style>
