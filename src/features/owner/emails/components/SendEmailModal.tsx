"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
	sendEmailSchema,
	type SendEmailInput,
} from "@/features/owner/emails/schema";
import { useSendEmail } from "../hooks/useEmails";

interface Props {
	open: boolean;
	onClose: () => void;
	selectedUsers: { id: string; name: string; email: string }[];
}

export function SendEmailModal({ open, onClose, selectedUsers }: Props) {
	const sendMutation = useSendEmail();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SendEmailInput>({
		resolver: zodResolver(sendEmailSchema),
		defaultValues: {
			recipientType: selectedUsers.length === 1 ? "SINGLE" : "CUSTOM",
			userIds: selectedUsers.map(u => u.id),
		},
	});

	const onSubmit = (data: SendEmailInput) => {
		sendMutation.mutate(
			{ ...data, userIds: selectedUsers.map(u => u.id) },
			{
				onSuccess: () => {
					reset();
					onClose();
				},
			},
		);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Email পাঠান"
			description={`${selectedUsers.length} জন recipient বাছাই করা হয়েছে`}
			size="lg">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="rounded-md border border-border bg-surface-subtle p-3">
					<p className="mb-1 text-xs font-medium text-text-muted">
						Recipients:
					</p>
					<div className="flex flex-wrap gap-1.5">
						{selectedUsers.map(u => (
							<span
								key={u.id}
								className="rounded-full bg-accent-subtle px-2.5 py-1 text-xs text-brand-purple-dark">
								{u.name}
							</span>
						))}
					</div>
				</div>

				<Input
					label="Subject"
					placeholder="Email subject"
					{...register("subject")}
					error={errors.subject?.message}
				/>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-text-primary">
						Message
					</label>
					<textarea
						{...register("body")}
						rows={6}
						placeholder="Email এর content"
						className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-accent-glow"
					/>
					{errors.body && (
						<p className="mt-1 text-xs text-red-500">{errors.body.message}</p>
					)}
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button type="button" variant="ghost" onClick={onClose}>
						বাতিল
					</Button>
					<Button type="submit" loading={sendMutation.isPending}>
						পাঠান
					</Button>
				</div>
			</form>
		</Modal>
	);
}
