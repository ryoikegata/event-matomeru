"use client";
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/utils/supabase/supabase";

export default function LogIn() {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const queryParams = new URLSearchParams(window.location.search);
        const tenantId = queryParams.get("tenant_id");
        const role_id = queryParams.get("role_id");
        if (tenantId) {
          await supabase.from("users").upsert({
            uuid: session.user.id,
            email: session.user.email,
            tenant_id: tenantId,
            role_id: role_id,
          });
        }
      }
    });
  }, []);

  return (
    <main>
      <section className="w-300 m-auto flex flex-col h-screen justify-center">
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "メールアドレス",
                email_input_placeholder: "メールアドレスを入力してください",
                password_label: "パスワード",
                password_input_placeholder: "パスワードを入力してください",
                button_label: "ログイン",
                loading_button_label: "ログイン中...",
                social_provider_text: "Googleでログイン",
                link_text: "既にアカウントをお持ちですか？",
              },
              sign_up: {
                link_text: "サインアップ",
                confirmation_text: "アカウントをお持ちでない方はこちら",
                email_label: "メールアドレス",
                email_input_placeholder: "メールアドレスを入力してください",
                password_label: "パスワード",
                password_input_placeholder: "パスワードを入力してください",
                button_label: "ログイン",
                loading_button_label: "ログイン中...",
                social_provider_text: "Googleでログイン",
              },
              magic_link: {
                link_text: "メールでログイン",
                confirmation_text: "メールでログイン",
                email_input_placeholder: "メールアドレスを入力してください",
                button_label: "ログイン",
              },
              forgotten_password: {
                link_text: "パスワードをお忘れですか？",
                confirmation_text: "パスワードをお忘れですか？",
                email_label: "メールアドレス",
                email_input_placeholder: "メールアドレスを入力してください",
                button_label: "メールを送信",
                loading_button_label: "送信中...",
              },
            },
          }}
          appearance={{
            theme: ThemeSupa,
            style: {},
            className: {
              button: "px-3 py-2 rounded-md font-medium bg-[#0584c7]",
            },
          }}
        />
      </section>
    </main>
  );
}
