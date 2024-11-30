<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\MessageReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mailjet\LaravelMailjet\Facades\Mailjet;
use Mailjet\Resources;

class ContactMessageController extends Controller
{
    // Show contact messages and reply messages to user
    public function contactMessages () {
        $user = Auth()->user();
        if(is_null($user))
        {
            return Inertia::render('Contact/ContactUs');
        }
        $contactMessages = ContactMessage::with('replies')->where('user_id', $user->id)->get();
        return Inertia::render('Contact/ContactUs', [
            'contactMessages' => $contactMessages,
        ]);
    }

    // Store a new contact message from user or guest
    public function storeMessage(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone_number' => 'nullable|string|max:17',
            'message' => 'required|string',
        ]);

        $newMessage = ContactMessage::create([
            'user_id' => auth()->check() ? auth()->id() : null,
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'message' => $request->message,
        ]);

        $mj = Mailjet::getClient();

        if ($newMessage){
            $body = [
                'FromEmail' => "noreply@heartyaid.com",
                'FromName' => "Hearty Aid",
                'Subject' => "New Contact Message received!",
                'MJ-TemplateID' => 6506144,
                'MJ-TemplateLanguage' => true,
                'Vars' => [
                    'name' => $newMessage->name,
                    'message' => $newMessage->message,
                    'link' => 'https://heartyaid.com/admin/contact-message/'.$newMessage->id
                ],
                'Recipients' => [['Email' => 'heartyaidbkk@gmail.com']]
            ];
            
            // Send email
            $response = $mj->post(Resources::$Email, ['body' => $body]);
    
            if (!$response->success()) {
                Log::error('Mailjet response:', [
                    'status' => $response->getStatus(),
                    'reason' => $response->getReasonPhrase(),
                    'body' => $response->getBody(),
                ]);
            }
        }
        return redirect()->back()->with('success', 'Your message has been sent!');
    }

    // Admin contact message list 
    public function contactMessage()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/ContactMessage/AdminContactMessages', [
            'messages' => $messages,
        ]);
    }

    // Admin single message showing 
    public function adminSingleMessage($id)
    {
        $message = ContactMessage::with('replies')->findOrFail($id);
        // Mark as read if not already
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }
        return Inertia::render('Admin/ContactMessage/AdminSingleContactMessage', [
            'message' => $message
        ]);
    }

    // Reply to a message
    public function reply(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string',
        ]);

        $message = ContactMessage::findOrFail($id);
        // Handle the reply logic here (e.g., send email)
        $message->is_replied = true;
        $message->save();

        return redirect()->back()->with('success', 'Reply sent successfully!');
    }

    // Mark as unread
    public function markAsUnread($id, Request $request)
    {
        $message = ContactMessage::findOrFail($id);
        $message->is_read = false;
        $saved = $message->save(); // Save the change to the database
    
        if ($saved) {
            return redirect()->route('admin.messages')->with('success', 'Marked as Unread');
        } else {
            return back()->with('error', 'Failed to mark as unread');
        }
    }

    // Delete a message
    public function adminDeleteMessage($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return redirect()->route('admin.messages')->with('success', 'Message deleted successfully!');
    }

    // Reply to a message by admin
    public function storeReplyMessage(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string',
        ]);

        $message = ContactMessage::findOrFail($id);
        $message->is_replied = true;
        $message->save();

        $name = Auth::user()->name; // Fetch the admin's nickname from the authenticated user

        $newReply = MessageReply::create([
            'contact_message_id' => $message->id,
            'name' => $name,
            'reply' => $request->input('reply'),
        ]);

        $mj = Mailjet::getClient();

        if ($newReply){
            $body = [
                'FromEmail' => "noreply@heartyaid.com",
                'FromName' => "Hearty Aid",
                'Subject' => "Reply Message received!",
                'MJ-TemplateID' => 6506333,
                'MJ-TemplateLanguage' => true,
                'Vars' => [
                    'name' => $message->name,
                    'reply' => $newReply->reply,
                ],
                'Recipients' => [['Email' => $message->email]]
            ];
            
            // Send email
            $response = $mj->post(Resources::$Email, ['body' => $body]);
    
            if (!$response->success()) {
                Log::error('Mailjet response:', [
                    'status' => $response->getStatus(),
                    'reason' => $response->getReasonPhrase(),
                    'body' => $response->getBody(),
                ]);
            }
        }

        return back()->with('success', 'Message replied successfully!');
    }

    // Delete a reply message
    public function adminDeleteReplyMessage($id)
    {
       $replyMessage = MessageReply::findOrFail($id);

        // Get the associated ContactMessage ID before deleting the reply
        $contactMessageId = $replyMessage->contact_message_id;

        // Delete the reply message
        $replyMessage->delete();

        // Check if there are any remaining replies for this ContactMessage
        $remainingReplies = MessageReply::where('contact_message_id', $contactMessageId)->count();

        // If no replies left, set is_replied to false
        if ($remainingReplies === 0) {
            $contactMessage = ContactMessage::findOrFail($contactMessageId);
            $contactMessage->update(['is_replied' => false]);
        }

        return redirect()->back()->with('success', 'Reply Message deleted!');
    }
}
