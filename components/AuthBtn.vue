<template>
	<!-- <a href='https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=173102065734-7sm6g8qf7plld93ap5ie79j6jl011nfn.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:3000/auth-callback&access_type=offline'>Авторизоваться через Google</a> -->
	<div class="auth-btn__outer">
		<a href='https://oauth.yandex.ru/authorize?response_type=code&client_id=e8f66732424a4faba3aa58f46833a9d0'>
			<div class="auth-btn">
				<div class="auth-btn__logo"></div>
				<p class="auth-btn__text">Войти</p>
			</div>
		</a>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
	.auth-btn__outer {
		display: flex;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.auth-btn {
		display: flex;
		justify-content: space-between;
		width: 160px;
		height: 65px;
		padding: 12px 20px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}

	.auth-btn__logo {
		width: 40px;
		height: 40px;
		background-image: url('../static/auth-logo.svg');
        background-size: cover;
        background-repeat: no-repeat;
	}

	.auth-btn__text {
		align-self: center;
		font-size: 24px;
		line-height: 28px;
		color: black;
	}

	a {
		text-decoration: none;
	}
	
</style>
