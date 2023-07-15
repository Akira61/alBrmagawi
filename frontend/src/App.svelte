<script>
  import { Router, Link, Route } from "svelte-routing";
  import {URLs} from "./url.config"
  import Home from "./pages/Home.svelte";
  import Register from "./pages/auth/register.svelte";
  import Login from "./pages/auth/login.svelte";
  import ForgotPassword from "./pages/auth/forgot-password.svelte";
</script>

<main>
  <Router>
    <Route path= {URLs.index} component={Home} />
    <Route path = {URLs.auth.student_register} component={Register}/>
    <Route path = {URLs.auth.login} component={Login}/>
    <Route path = {URLs.auth.forgotPassword} component={ForgotPassword}/>
    
  </Router>
</main>

<style>
  
</style>
