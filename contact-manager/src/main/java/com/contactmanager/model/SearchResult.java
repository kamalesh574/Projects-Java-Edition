package com.contactmanager.model;

public class SearchResult {

    private Contact contact;
    private int score;

    public SearchResult(Contact contact, int score) {
        this.contact = contact;
        this.score = score;
    }

    public Contact getContact() {
        return contact;
    }

    public int getScore() {
        return score;
    }
}